module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    uid: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true
    },
    profileUrl: {
      type: Sequelize.STRING,
      allowNull: true
    },
    team: {
      type: Sequelize.STRING,
      allowNull: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });

  return User;
}