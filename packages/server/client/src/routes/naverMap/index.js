const express = require('express');
const router = express.Router();
const { NaverMap } = require('../../models');

router.get('/', async (req, res, next) => {
  try {
    const fullMap = await NaverMap.findAll();
    return res.send(fullMap);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

module.exports = router;