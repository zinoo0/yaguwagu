const Sequelize = require('sequelize');
const { MYSQL_HOST, MYSQL_USER, MYSQL_PW } = require('../config/config');

module.exports = (dbName) => {
  const db = {};

  const sequelize = new Sequelize(dbName, MYSQL_USER, MYSQL_PW, {
    host: MYSQL_HOST || '',
    dialect: 'mysql',
    define: {
      underscored: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  });
  
  // User
  db.User = require('./User')(sequelize, Sequelize);

  // Partner
  db.Partner = require('./Partner')(sequelize, Sequelize);
  db.PartnerMainImage = require('./PartnerMainImage')(sequelize, Sequelize);
  db.PartnerMenuImage = require('./PartnerMenuImage')(sequelize, Sequelize);
  db.PartnerMenu = require('./PartnerMenu')(sequelize, Sequelize);
  
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  
  // sync
  // db.sequelize.sync();
  
  return db;
}
