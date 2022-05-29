const dbConfig = require("../config/dbConfig.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.model")(sequelize, Sequelize);
db.products = require("./product.model")(sequelize, Sequelize);

db.users.hasOne(db.products, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.products.belongsTo(db.users);

module.exports = db;

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.log("Failed to connect to database"));

//################################################################################################################
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log("Error" + err);
  });
