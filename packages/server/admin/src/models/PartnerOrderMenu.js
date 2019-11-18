module.exports = (sequelize, Sequelize) => {
  const PartnerOrderMenu = sequelize.define('partnerOrderMenu', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },    
  }, {
    tableName: 'partner_order_menu',
    timestamps: false
  });

  return PartnerOrderMenu;
}
