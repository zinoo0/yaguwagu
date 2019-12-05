import Vue from 'vue';
import firebase from 'firebase';
import { firestorePlugin } from 'vuefire';
import config from '../config/config';

Vue.use(firestorePlugin, { wait: true});

const firestore = firebase.initializeApp(config.FIREBASE_CONFIG).firestore();

Vue.prototype.$firebase = firebase;

export const db = firestore;

