const adminDB = require('../models')('yaguwagu_admin');
const clientDB = require('../models')('yaguwagu_client');

const userSync = async () => {
  try {
    await adminDB.User.destroy({ truncate: true, cascade: false });

    const fullUser = await clientDB.User.findAll();

    for(const user of fullUser) {
      await adminDB.User.create({
        uid: user.uid,
        email: user.email,
        phone: user.phone,
        profileUrl: user.profileUrl,
        team: user.team,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = userSync;