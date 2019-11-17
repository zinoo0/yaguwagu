const firebase = require('firebase');
const config = require('../config/config');
require('firebase/auth');
require('firebase/database');

firebase.initializeApp(config.FIREBASE_CONFIG);

module.exports = {
  isAuthenticated: (req, res, next) => {
    const user = firebase.auth().currentUser
    if (user !== null) {
      req.user = user;
      return next();
    } else {
      return res.status(401).send('인증 실패하셨습니다.');
    }
  },
}