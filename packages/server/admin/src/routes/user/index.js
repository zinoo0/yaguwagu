const express = require('express');
const router = express.Router();
const db = require('../../models');

// User
router.get('/', async (req, res, next) => {
  try {
    const user = await db.User.findAll()
    return res.send(user);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;