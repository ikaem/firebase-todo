// functions/APIs/users.js

const {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} = require('firebase/auth');

const config = require('../util/config');

const { loginAuth, adminDb, adminStorage } = require('../util/admin');
const { validateLoginData, validateSignupData } = require('../util/validators');

// this is function to delete image from the bucket
// i guess we want to delete the previous image store on the server
const deleteImage = async (imageName = 'karlo.jpg') => {
  // we are getting a default bucket now - we could specifiy a name of it

  // console.log({ adminStorage });

  const bucket = adminStorage.bucket();
  const path = `${imageName}`;

  try {
    // this will search for all such files
    const foundFiles = await bucket.file(path).exists(async (err, exists) => {
      if (err) {
        console.error('this is logged error:', err);
        throw err;
      }
      if (!exists) return false;
      await bucket.file(path).delete();
      return true;
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

exports.updateUserDetails = async (request, response) => {
  // might be neeter to use colleciton than directly to access document
  const document = adminDb.collection('users').doc(request.user.username);

  try {
    await document.update(request.body);
  } catch (err) {
    console.error(err);
    response.status(500).json({
      message: 'Cannot update the value',
    });
  }
};

exports.getUserDetails = async (request, response) => {
  const userData = {};

  const documentRef = adminDb.doc(`/users/${request.user.username}`);

  try {
    const document = await documentRef.get();

    // SHOULD probably respond that there is no such data
    if (!document.exists) return;

    userData.userCredentials = document.data();

    response.json(userData);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: error.code });
  }
};

exports.uploadProfilePhoto = async (request, response) => {
  const BusBoy = require('busboy');
  const path = require('path');
  // we also use os - this is some kind of node stuff
  const os = require('os');
  const fs = require('fs');

  // we create a busboy instance
  const busboy = new BusBoy({ headers: request.headers });

  let imageFileName;
  let imageToBeUploaded = {
    filePath: '',
    mimetype: '',
  };

  // now we listen for the file name, and check the type and so on
  // we get args in the callback
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== 'image/png' && mimetype !== 'image/jpeg')
      return response.status(400).json({ error: 'Wrong file type submitted' });

    // now we get extension - we split by ., and then we get the last secion
    const imageExtension = filename.split('.')[filename.split('.').length - 1];

    // then we create file name
    // note that we access user from the request, which means we have to put that auth middleware somewher
    imageFileName = `${request.user.username}.${imageExtension}`;
    // getting the file path - we i guess get some tempdir, merge it with the image file name  - i guess the file wil lbe saved there
    // we actually create the filepath here
    const filePath = path.join(os.tmpdir(), imageFileName);
    // then we constructo the file
    imageToBeUploaded = { filePath, mimetype };
    // and then we pipe the file to the filesystem - we bascially write filedata into the file name we specified beforehand
    file.pipe(fs.createWriteStream(filePath));
  });

  // now we deletre old image from the bzcjet

  try {
    await deleteImage(imageFileName);
  } catch (err) {
    console.error(err);
    // throw err;
  }

  // now we handle some finish event

  busboy.on('finish', async () => {
    // we want to upload stuff here when busboy ends i guess
    // we upload only the image from the filepath
    // we also set the content type

    try {
      await adminStorage.bucket().upload(imageToBeUploaded.filePath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
          },
        },
      });

      // then we get the image url - we know what it is - probably should be stored in a constants somewhere
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;

      // we only update a single filed
      await adminDb.doc(`/users/${request.user.username}`).update({ imageUrl });

      response.json({ message: 'Image uploaded successfully' });
    } catch (err) {
      console.error(err);
      response.status(500).json({ error: error.code });
    }
  });

  // and i guess now we we just want to end someting
  busboy.end(request.rawBody);

  //
};

exports.signupUser = async (request, response) => {
  const newUser = ({
    firstName,
    lastName,
    email,
    phoneNumber,
    country,
    password,
    confirmPassword,
    username,
  } = request.body);

  const { valid, errors } = validateSignupData(newUser);

  if (!valid) return response.status(400).json(errors);

  const document = adminDb.doc(`/users/${newUser.username}`);

  try {
    const doc = await document.get();

    if (doc.exists)
      return response
        .status(400)
        .json({ username: 'This username is already taken' });

    const createUserResponse = await createUserWithEmailAndPassword(
      loginAuth,
      newUser.email,
      newUser.password
    );

    const token = await createUserResponse.user.getIdToken();

    console.log({ user: createUserResponse.user });

    const userCredentials = {
      firstName: newUser.firstName,
      lastname: newUser.lastName,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      country: newUser.country,
      username: newUser.username,
      createdAt: new Date().toISOString(),
      userId: createUserResponse.user.uid,
    };

    await adminDb.doc(`/users/${newUser.username}`).set(userCredentials);

    response.status(201).json({ token });
  } catch (error) {
    console.log(Object.keys(error));
    console.error('this is error', error);

    if (error.code === 'auth/email-already-in-use') {
      return response.status(400).json({ email: 'Email already in use' });
    }

    return response
      .status(500)
      .json({ general: 'Something went wrong. Please try again' });
  }
};

// TODO this is i guess used later by firebase tool in index .hs
exports.loginUser = async (request, response) => {
  const user = {
    email: request.body.email,
    password: request.body.password,
  };

  const { valid, errors } = validateLoginData(user);

  if (!valid) return response.status(400).json(errors);

  try {
    const data = await signInWithEmailAndPassword(
      loginAuth,
      user.email,
      user.password
    );

    console.log({ data });

    // i guess this is something by firebase, the idToken
    const token = await data.user.getIdToken();

    console.log({ token });

    return response.json(token);
  } catch (error) {
    console.error('this is error', error);

    // status 403 is forbidden
    response
      .status(403)
      .json({ general: 'Wrong credentials, please try again' });
  }
};
