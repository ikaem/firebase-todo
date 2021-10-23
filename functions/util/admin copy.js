// // api/functions/util/admin.js
// const { credential } = require('firebase-admin');
// const { initializeApp: initializeAdminApp } = require('firebase-admin/app');
// const { getAuth: getAdminAuth } = require('firebase-admin/auth');
// const { getFirestore } = require('firebase-admin/firestore');

// const { getAuth } = require('firebase/auth');
// const { initializeApp } = require('firebase/app');

// // TODO this should probably be stored in an evn variabel
// // https://firebase.google.com/docs/admin/setup?authuser=0
// // https://stackoverflow.com/questions/56673471/how-to-create-firebase-authentication-custom-token-without-service-account-json
// const serviceAccount = require('./fb-admin-service-key.json');

// // console.log({ serviceAccount });

// // admin.initializeApp();

// // const db = admin.firestore();

// // module.exports = { admin, db };

// // const { getAuth } = require('@firebase/auth');
// // const { getFirestore } = require('@firebase/firestore');
// // const { initializeApp } = require('firebase/app');

// const config = require('../util/config');

// // TODO what is with this
// const app = initializeApp(config);
// const adminApp = initializeApp(
//   // TODO this should prolly go into an env
//   {
//     credential: credential.cert(serviceAccount),
//   }
// );
// const adminAuth = getAdminAuth(adminApp);
// const loginAuth = getLoginAuth(app);
// const db = getFirestore(adminApp);

// // const db = admin.firestore();

// module.exports = { adminAuth, loginAuth, db };
