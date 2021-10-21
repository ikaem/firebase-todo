const { auth, db } = require('../util/admin');

module.exports = (request, response, next) => {
  let idToken;

  const { authorization } = request.headers;

  // cool startsWith function
  if (authorization && authorization.startsWith('Bearer ')) {
    idToken = authorization.split('Bearer ')[1];
  } else {
    console.error('No token found');
    return response.status(403).json({ error: 'Unathorized' });
  }

  try {

    // here we actually verify the token sent to us by the client 

    const token = 


  } catch (err) {}
};
