const firebaseAdmin = require('firebase-admin');
const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');

const config = require('../util/config');

// probably dont need the service account
// const serviceAccount = require('./fb-admin-service-key.json');
// const adminApp = firebaseAdmin.initializeApp({
// credential: firebaseAdmin.credential.cert(serviceAccount),
// });

const adminApp = firebaseAdmin.initializeApp();

// const app = initializeApp(config);

// const app = initializeApp(adminApp.options);
const app = initializeApp({
  apiKey: process.env.API_KEY,
});

const adminAuth = firebaseAdmin.auth(adminApp);
const adminDb = firebaseAdmin.firestore(adminApp);
const adminStorage = firebaseAdmin.storage(adminApp);
const loginAuth = getAuth(app);

module.exports = {
  adminDb,
  adminAuth,
  adminStorage,
  loginAuth,
};
