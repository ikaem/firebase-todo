// api/functions/util/admin.js
const { credential } = require('firebase-admin');
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');

// TODO this should probably be stored in an evn variabel
// https://firebase.google.com/docs/admin/setup?authuser=0
// https://stackoverflow.com/questions/56673471/how-to-create-firebase-authentication-custom-token-without-service-account-json
const serviceAccount = require('./fb-admin-service-key.json');

// console.log({ serviceAccount });

// admin.initializeApp();

// const db = admin.firestore();

// module.exports = { admin, db };

// const { getAuth } = require('@firebase/auth');
// const { getFirestore } = require('@firebase/firestore');
// const { initializeApp } = require('firebase/app');

const config = require('../util/config');

// TODO what is with this
// const app = initializeApp(config);
const app = initializeApp(
  // TODO this should prolly go into an env
  {
    credential: credential.cert(serviceAccount),
  }
);
const auth = getAuth(app);
const db = getFirestore(app);

// const db = admin.firestore();

module.exports = { auth, db };
