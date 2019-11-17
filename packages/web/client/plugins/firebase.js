import Vue from 'vue';
import firebase from 'firebase';
import { firestorePlugin } from 'vuefire';
import config from '../config/config';

Vue.use(firestorePlugin, { wait: true});

const firestore = firebase.initializeApp(config.FIREBASE_CONFIG).firestore();

export default ({ store, redirect, route }) => {
  firebase.auth().onAuthStateChanged((user) => {
    if(user) {
      user.getIdToken().then((accessToken) => {
        const payload = {
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          uid: user.uid,
          phoneNumber: user.phoneNumber,
          providerData: user.providerData,
          accessToken: accessToken
        }      
        store.dispatch('users/logIn', payload);
        redirect('/');
      });
    }
  });
}

Vue.prototype.$firebase = firebase;

export const db = firestore;

