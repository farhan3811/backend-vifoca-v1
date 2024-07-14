const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.biodata = require("./biodata.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./roles.model.js")(sequelize, Sequelize);
db.materi = require("./materi.model.js")(sequelize, Sequelize);
db.assigment = require("./assigment.model.js")(sequelize, Sequelize);
db.draw = require("./draw.model.js")(sequelize, Sequelize);
db.penilaian = require("./penilaian.model.js")(sequelize, Sequelize);
module.exports = db;
