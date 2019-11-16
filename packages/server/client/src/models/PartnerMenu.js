module.exports = (sequelize, Sequelize) => {
  const PartnerMenu = sequelize.define('partner_menu', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return PartnerMenu;
}