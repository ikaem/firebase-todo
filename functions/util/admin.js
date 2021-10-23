const firebaseAdmin = require('firebase-admin');
const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');

const serviceAccount = require('./fb-admin-service-key.json');
const config = require('../util/config');

const adminApp = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});
const app = initializeApp(config);

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
