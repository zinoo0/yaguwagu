const express = require('express');
const router = express.Router();
const db = require('../../models');
const AWS = require('aws-sdk');

const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = require('../../config/config');

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region : 'ap-northeast-2'
});

router.post('/', async (req, res, next) => {
  try {
    // Partner DB 저장
    const partner = await db.Partner.create({
      name: req.body.name,
      phone: req.body.phone,
      time: req.body.time,
    });
    
    // Partner Menu 저장
    for(const menu of req.body.menus) {
      await db.PartnerMenu.create({
        partnerId: partner.dataValues.id,
        name: menu.name,
        price: menu.price,
      });
    }
    // Partner Main Image 저장
    for(const mainImage of req.body.mainImages) {
      const base64Data = new Buffer.from(mainImage.base64Data.replace(/^data:image\/\w+;base64,/, ""), 'base64');
      const param = {
        Bucket: 'yaguwagu',
        Key: `admin/${req.body.name}/main_image/${mainImage.fileName}`,
        ACL: 'public-read',
        Body: base64Data,
        ContentEncoding: 'base64'
      }

      const s3Response = await s3.upload(param).promise();

      await db.PartnerMainImage.create({
        partnerId: partner.dataValues.id,
        url: s3Response.Location,
      });
    }

    // Partner Menu Image 저장
    for(const [index, menuImage] of req.body.menuImages.entries()) {
      const base64Data = new Buffer.from(menuImage.base64Data.replace(/^data:image\/\w+;base64,/, ""), 'base64');
      const param = {
        Bucket: 'yaguwagu',
        Key: `admin/${req.body.name}/menu_image/${menuImage.fileName}`,
        ACL: 'public-read',
        Body: base64Data,
        ContentEncoding: 'base64', // required
      }
      const s3Response = await s3.upload(param).promise();
      
      await db.PartnerMenuImage.create({
        partnerId: partner.dataValues.id,
        url: s3Response.Location,
      });

      // for문 전부 돌면 response
      if(index === req.body.menuImages.length - 1) {
        return res.send('성공적으로 파트너가 등록되었습니다.');
      }
    }
  } catch(err) {
    console.error(err);
    next(err)
  }
});

router.get('/')

module.exports = router;