module.exports = (sequelize, Sequelize) => {
  const Partner = sequelize.define('partner', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    time: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  Partner.associate = (db) => {
    db.Partner.hasMany(db.PartnerMainImage);
    db.Partner.hasMany(db.PartnerMenuImage)
    db.Partner.hasMany(db.PartnerMenu)
  }

  return Partner;  
}