// // functions/APIs/users.js
// // const { initializeApp } = require('firebase/app');
// const { randomUUID } = require('crypto');
// const {
//   // signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   // getAuth,
//   getIdToken,
// } = require('firebase/auth');
// // const {
// //   // getFirestore,
// //   getDoc,
// //   doc,
// //   addDoc,
// //   collection,
// // } = require('firebase/firestore');

// const { adminAuth, loginAuth, db } = require('../util/admin');

// // const { admin, db } = require('../util/admin');
// // const config = require('../util/config');

// const { validateLoginData, validateSignupData } = require('../util/validators');

// exports.signupUser = async (request, response) => {
//   const newUser = ({
//     firstName,
//     lastName,
//     email,
//     phoneNumber,
//     country,
//     password,
//     confirmPassword,
//     username,
//   } = request.body);

//   const { valid, errors } = validateSignupData(newUser);

//   if (!valid) return response.status(400).json(errors);

//   const document = db.doc(`/users/${newUser.username}`);

//   try {
//     // const docRef = await getDoc(doc(db, 'users', newUser.username));

//     const doc = await document.get();

//     // if (docRef.exists())
//     if (doc.exists)
//       return response
//         .status(400)
//         .json({ username: 'This username is already taken' });

//     // console.log({ auth });

//     // await createUserWithEmailAndPassword(loginAuth, email, password);

//     // now we create the user for the login only

//     // console.log({ auth2 });

//     // const createUserResponse = await createUserWithEmailAndPassword(
//     //   auth,
//     //   newUser.email,
//     //   newUser.password
//     // );

//     // const createUserResponse = await auth.createUser({
//     //   email: newUser.email,
//     //   password: newUser.password,
//     //   displayName: username,
//     // });

//     // // console.log('resp', createUserResponse.providerData[0]);

//     // console.log('resp', createUserResponse);

//     // // const userInfo =

//     // const { uid, email, displayName } = createUserResponse;

//     // const userInfo = {
//     //   uid,
//     //   email,
//     //   displayName,
//     // };

//     // const token = await auth.createCustomToken(randomUUID());
//     // // const token = await auth.createCustomToken(userInfo);

//     // console.log({ userInfo });

//     /*
// >  resp UserRecord {
// >    uid: 'uxIfwuKYpuToYpwc836bepSQRRA3',
// >    email: 'm1lo@g2m2ail.connmm',
// >    emailVerified: false,
// >    displayName: undefined,
//       ...

//     */

//     // const decodedToken = await auth.verifyIdToken(token);
//     // console.log({ decodedToken });

//     response.status(201).json({ token: 'token' });

//     // const token = await createUserResponse.providerData[0].getIdToken();

//     // const token = await getIdToken(createUserResponse.providerData[0]);

//     // console.log({ token, token2 });

//     // const token = await getIdToken(createUserResponse.providerData);
//     // console.log('this is token', token);

//     // console.log('this is create user response', createUserResponse);

//     // const token = await createUserResponse.user.getIdToken();

//     // console.log(createUserResponse.providerData);

//     // auth.createCustomToken;

//     // // now we set user data into the database
//     // const userCredentials = {
//     //   firstName: newUser.firstName,
//     //   lastname: newUser.lastName,
//     //   email: newUser.email,
//     //   phoneNumber: newUser.phoneNumber,
//     //   country: newUser.country,
//     //   username: newUser.username,
//     //   createdAt: new Date().toISOString(),
//     //   userId: createUserResponse.user.uid,
//     // };

//     // const addedDocRef = await addDoc(collection(db, 'users'), userCredentials);

//     // console.log('this is added doc ref', addedDocRef);

//     // now we add user to the database
//   } catch (error) {
//     console.log(Object.keys(error));
//     console.error('this is error', error);

//     if (error.code === 'auth/email-already-in-use') {
//       return response.status(400).json({ email: 'Email already in use' });
//     }

//     return response
//       .status(500)
//       .json({ general: 'Something went wrong. Please try again' });
//   }
// };

// exports.loginUser = () => console.log('what');

// // TODO this is i guess used later by firebase tool in index .hs
// // exports.loginUser = async (request, response) => {
// //   const user = {
// //     email: request.body.email,
// //     password: request.body.password,
// //   };

// //   const { valid, errors } = validateLoginData(user);

// //   if (!valid) return response.status(400).json(errors);

// //   try {
// //     const data = await signInWithEmailAndPassword(
// //       auth,
// //       user.email,
// //       user.password
// //     );

// //     console.log({ data });

// //     // i guess this is something by firebase, the idToken
// //     const token = await data.user.getIdToken();

// //     console.log({ token });

// //     return response.json(token);
// //   } catch (error) {
// //     console.error('this is error', error);

// //     // status 403 is forbidden
// //     response
// //       .status(403)
// //       .json({ general: 'Wrong credentials, please try again' });
// //   }
// // };
