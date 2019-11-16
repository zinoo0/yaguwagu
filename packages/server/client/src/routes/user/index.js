const express = require('express');
const router = express.Router();
const db = require('../../models');

// IP 조회
const getClientIp = (req) => {
  let ipAddress;
  // The request may be forwarded from local web server.
  let forwardedIpsStr = req.header('x-forwarded-for'); 
  if (forwardedIpsStr) {
    let forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress) {
    // If request was not forwarded
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
};

// 자신 profile 조회
router.get('/profile', async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { uid: req.query.uid }
    })
    return res.send(user);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

// profile 조회
router.get('/profile_other', async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { uid: req.query.uid },
      attributes: ['username', 'email', 'profileUrl', 'team']
    });
    return res.send(user);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

// login
router.post('/login', async (req, res, next) => {
  try {
    const exUser = await db.User.findOne({where: { uid: req.body.uid }});
    if(exUser) {
      await db.LogSession.update({
        is_activate: 1
      }, {
        where: { uid: req.body.uid }
      });
    } else {
      await db.User.create({
        uid: req.body.uid,
        email: req.body.email,
        profileUrl: req.body.profileUrl,
        username: req.body.username,
        phone: req.body.phone
      });
    }
    await db.LogSession.create({
      uid: req.body.uid,
      accessToken: req.body.accessToken,
      remoteIp: getClientIp(req),
      tokenExpiredAt: Date.now() + 86400000,
      isActivate: 1
    });
    const user = await db.User.findOne({where: { uid: req.body.uid }});
    return res.send(user);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

// logout
router.put('/logout', async (req, res, next) => {
  try {
    await db.LogSession.update({
      isActivate: 1
    }, {
      where: { uid: req.body.uid }
    });
    return res.send('로그아웃 되었습니다.');
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

// update
router.put('/update', async(req, res, next) => {
  try {
    await db.User.update({
    username: req.body.username,
    phone: req.body.phone,
    team: req.body.team
    }, {
      where: { uid: req.body.uid }
    });

    const user = await db.User.findOne({
      where: { uid: req.body.uid },
      attributes: ['username', 'phone', 'team']
    });
    return res.send(user);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

// delete
router.delete('/delete', async (req, res, next) => {
  try {
    await db.User.destroy({where: {uid: req.query.uid }});
    return res.send('정상적으로 삭제되었습니다.');
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

module.exports = router;