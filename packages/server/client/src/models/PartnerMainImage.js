module.exports = (sequelize, Sequelize) => {
  const PartnerMainImage = sequelize.define('partner_main_image', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: Sequelize.TEXT('medium'),
      allowNull: false,
    },
  });

  return PartnerMainImage;
}