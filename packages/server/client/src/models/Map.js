module.exports = (sequelize, Sequelize) => {
  const Map = sequelize.define('map', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    x: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    y: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    roadAddress: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    jibunAddress: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    englishAddress: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return Map;
}