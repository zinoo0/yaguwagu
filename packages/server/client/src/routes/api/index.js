const express = require('express');
const request = require('request');
const router = express.Router();
const db = require('../../models');
const { DOOG, KT, LOTTE, KIUM, SK, SAMSUNG, HANWHA, KIA, NC } = require('./geolocation');

var geoLoation = [DOOG, KT, LOTTE, KIUM, SK, SAMSUNG, HANWHA, KIA, NC]

router.post('/map', (req, res, next) => {
  try {
    geoLoation.forEach((element) => {
      request.get(element, (error, response, body) => {
        if(error) {
          return next(error);
        }
        const data = JSON.parse(body).addresses[0];
        db.Map.create({
          x: data.x,
          y: data.y,
          roadAddress: data.roadAddress,
          jibunAddress: data.jibunAddress,
          englishAddress: data.englishAddress
        })
      });
    });
    return res.send('Map Api 정상 작동');
  } catch(err) {
    console.error(err);
    return next(next);
  }

});

module.exports = router;