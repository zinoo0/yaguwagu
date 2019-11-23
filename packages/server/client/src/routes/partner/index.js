const express = require('express');
const router = express.Router();
const { PartnerMainImage, PartnerMenuImage, PartnerMenu } = require('../../models');

router.get('/', async (req, res, next) => {
  try {
    const fullPartner = await db.Partner.findAll({
      include: [{
        model: PartnerMainImage,
        as: 'mainImages'
      },{
        model: PartnerMenuImage,
        as: 'menuImages'
      },{
        model: PartnerMenu,
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