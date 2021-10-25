const { adminAuth, adminDb } = require('../util/admin');

module.exports = async (request, response, next) => {
  let idToken;

  const { authorization } = request.headers;

  console.log({ authorization });

  // cool startsWith function
  if (authorization && authorization.startsWith('Bearer ')) {
    idToken = authorization.split('Bearer ')[1];

    console.log(idToken);
  } else {
    console.error('No token found');
    return response.status(403).json({ error: 'Unathorized' });
  }

  try {
    // here we actually verify the token sent to us by the client

    // this is already decoded
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    request.user = decodedToken;

    const userData = await adminDb
      .collection('users')
      .where('userId', '==', request.user.uid)
      .limit(1)
      .get();

    request.user.username = userData.docs[0].data().username;
    request.user.imageUrl = userData.docs[0].data().imageUrl;

    next();
  } catch (err) {
    console.error('Error while verifying token', err.message);
    response.status(403).json(err);
  }
};
