const express = require('express');
const router = express.Router();
const { User } = require('../../models');

// User
router.get('/', async (req, res, next) => {
  try {
    const user = await User.findAll()
    return res.send(user);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

module.exports = router;