const express = require('express');
const router = express.Router();
const { User, LogSession } = require('../../models');
// const { isAuthenticated } = require('../middlewares');

const getClientIp = (req) => {
  let ipAddress;
  let forwardedIpsStr = req.header('x-forwarded-for'); 
  if (forwardedIpsStr) {
    let forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress) {
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
};

// profile
router.get('/profile', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { uid: req.query.uid }
    })
    return res.send(user);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

// profile
router.get('/profile/:uid', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { uid: req.params.uid },
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
    const exUser = await User.findOne({where: { uid: req.body.uid }});
    if(exUser) {
      await LogSession.update({
        is_activate: 1
      }, {
        where: { uid: req.body.uid }
      });
    } else {
      await User.create({
        uid: req.body.uid,
        email: req.body.email,
        profileUrl: req.body.profileUrl,
        username: req.body.username,
        phone: req.body.phone
      });
    }
    await LogSession.create({
      uid: req.body.uid,
      accessToken: req.body.accessToken,
      remoteIp: getClientIp(req),
      tokenExpiredAt: Date.now() + 86400000,
      isActivate: 1
    });
    const user = await User.findOne({where: { uid: req.body.uid }});
    return res.send(user);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

// logout
router.put('/logout', async (req, res, next) => {
  try {
    await LogSession.update({
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
    await User.update({
    username: req.body.username,
    phone: req.body.phone,
    team: req.body.team
    }, {
      where: { uid: req.body.uid }
    });

    const user = await User.findOne({
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
    await User.destroy({where: {uid: req.query.uid }});
    return res.send('정상적으로 삭제되었습니다.');
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

module.exports = router;