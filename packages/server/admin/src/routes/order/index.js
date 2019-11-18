const express = require('express');
const router = express.Router();
const db = require('../../models');

router.get('/', async (req, res, next) => {
  try {
    const fullPartnerOrder = await db.PartnerOrder.findAll({
      include: db.PartnerOrderMenu,
    });
    return res.json(fullPartnerOrder)
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

module.exports = router;