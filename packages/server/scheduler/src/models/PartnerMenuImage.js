module.exports = (sequelize, Sequelize) => {
  const PartnerMenuImage = sequelize.define('partner_menu_image', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return PartnerMenuImage;
}
