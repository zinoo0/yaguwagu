module.exports = (sequelize, Sequelize) => {
  const PartnerOrder = sequelize.define('partnerOrder', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    seat: {
      type: Sequelize.STRING,
      allowNull: false
    },
  }, {
    tableName: 'partner_order',
    timestamps: false
  });

  PartnerOrder.associate = (db) => {
    db.PartnerOrder.hasMany(db.PartnerOrderMenu);
  }

  return PartnerOrder;  
}