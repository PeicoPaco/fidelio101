"use strict"

const {initializeApp, cert, applicationDefault} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const {getStorage} = require("firebase-admin/storage");
const {getAuth} = require("firebase-admin/auth");


// initializeApp({
//   credential: applicationDefault(),
// })

initializeApp({

  credential: cert("./prod.json"),
});


const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

module.exports = {
  db,
  storage,
  auth,
}
