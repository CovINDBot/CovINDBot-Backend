"use strict";

const Sequelize = require("sequelize");
const { config } = require("../config/databases.js");
const { applyExtraSetup } = require("./extra-setup");

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const modelDefiners = [
  require("./user.model"),
  require("./amenity.model"),
  require("./offer.model"),
  require("./request.model"),
  require("./offer_amenity.model"),
  require("./request_amenity.model"),
  require("./location.model")
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
