const { app } = require("./app");
const { logger } = require("./logger");
const sequelize = require("./models");

// Use .env in development mode, .env.production in production mode
const dotenvfile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
require("dotenv").config({ path: dotenvfile });
require("./scripts")();
// Read the port from the environment file
const PORT = process.env.PORT || 8000;

async function assertDatabaseConnectionOk() {
  try {
    await sequelize.authenticate();
    logger.info("Database connection OK!");
  } catch (error) {
    logger.error("Unable to connect to the database:");
    logger.error(error.message);
    process.exit(1);
  }
}

async function initServer() {
  await assertDatabaseConnectionOk();
  await sequelize.sync();
  app.listen(PORT, () =>
    logger.info(`CovINDBot Server listening on Port ${PORT}`)
  );
}

sequelize.models.Offer.deleteOffer({ offerID: 1 });

initServer();
