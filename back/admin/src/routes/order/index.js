const express = require('express');
const router = express.Router();
const { PartnerOrder, PartnerOrderMenu } = require('../../models');

router.get('/', async (req, res, next) => {
  try {
    const fullPartnerOrder = await PartnerOrder.findAll({
      include: PartnerOrderMenu,
    });
    return res.json(fullPartnerOrder)
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

module.exports = router;