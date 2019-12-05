module.exports = (sequelize, Sequelize) => {
  const LogSession = sequelize.define('log_session', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },    
    uid: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    accessToken: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    remoteIp: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isActivate: {
      type: Sequelize.STRING.BINARY,
      allowNull: false,
    },
    tokenExpiredAt: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });

  return LogSession;
}