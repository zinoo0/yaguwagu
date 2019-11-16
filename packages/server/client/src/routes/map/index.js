const express = require('express');
const router = express.Router();
const db = require('../../models');

router.get('/', async (req, res, next) => {
  try {
    const fullMap = await db.Map.findAll();
    return res.send(fullMap);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

module.exports = router;