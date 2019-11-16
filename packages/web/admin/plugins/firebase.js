import Vue from 'vue';
import firebase from 'firebase';
import { firestorePlugin } from 'vuefire';

Vue.use(firestorePlugin, { wait: true});
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMNET_ID,
};

const firestore = firebase.initializeApp(firebaseConfig).firestore();

Vue.prototype.$firebase = firebase;

export const db = firestore;

