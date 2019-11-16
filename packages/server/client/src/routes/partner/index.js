const express = require('express');
const router = express.Router();
const db = require('../../models');

router.get('/', async (req, res, next) => {
  try {
    const fullPartner = await db.Partner.findAll({
      include: [{
        model: db.PartnerMainImage,
        as: 'mainImages'
      },{
        model: db.PartnerMenuImage,
        as: 'menuImages'
      },{
        model: db.PartnerMenu,
        as: 'menus'
      }]
    });
    return res.send(fullPartner);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

module.exports = router;