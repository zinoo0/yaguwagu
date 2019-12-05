const Sequelize = require("sequelize");
const { MYSQL_HOST, MYSQL_USER, MYSQL_PW } = require("../config/config");

module.exports = dbName => {
  const db = {};

  const sequelize = new Sequelize(dbName, MYSQL_USER, MYSQL_PW, {
    host: MYSQL_HOST || "",
    dialect: "mysql",
    define: {
      underscored: true,
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  });

  if (dbName === "yaguwagu_admin") {
    db.User = require("./User")(sequelize, Sequelize);

    db.Partner = require("./Partner")(sequelize, Sequelize);
    db.PartnerMainImage = require("./PartnerMainImage")(sequelize, Sequelize);
    db.PartnerMenuImage = require("./PartnerMenuImage")(sequelize, Sequelize);
    db.PartnerMenu = require("./PartnerMenu")(sequelize, Sequelize);

    db.PartnerOrder = require("./PartnerOrder")(sequelize, Sequelize);
    db.PartnerOrderMenu = require("./PartnerOrderMenu")(sequelize, Sequelize);
  } 
  
  else if (dbName === "yaguwagu_client") {
    db.User = require("./User")(sequelize, Sequelize);

    db.Partner = require("./Partner")(sequelize, Sequelize);
    db.PartnerMainImage = require("./PartnerMainImage")(sequelize, Sequelize);
    db.PartnerMenuImage = require("./PartnerMenuImage")(sequelize, Sequelize);
    db.PartnerMenu = require("./PartnerMenu")(sequelize, Sequelize);
  }

  else if (dbName === "yaguwagu_partner") {
    db.PartnerOrder = require("./PartnerOrder")(sequelize, Sequelize);
    db.PartnerOrderMenu = require("./PartnerOrderMenu")(sequelize, Sequelize);
  }

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  // db.sequelize.sync();

  return db;
};
