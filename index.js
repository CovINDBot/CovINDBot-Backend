const { app } = require("./app");
const { logger } = require("./logger");
const sequelize = require("./models");
const fs = require('fs');
const http = require('http');
const https = require('https');


// Use .env in development mode, .env.production in production mode
const dotenvfile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
require("dotenv").config({ path: dotenvfile });
// Read the port from the environment file
const PORT = process.env.PORT || 8000;

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

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

function startHttpServer() {
  var httpServer = http.createServer(app);
  httpServer.listen(PORT);
  logger.info(`CovINDBot Server listening on Port ${PORT}`);
}

function startHttpsServer() {
  var httpsServer = https.createServer(options, app);
  httpsServer.listen(PORT);
  logger.info(`CovINDBot Server listening on Port ${PORT}`);
}

async function initServer() {
  await assertDatabaseConnectionOk();
  await sequelize.sync();
  require("./scripts")();
  if (process.env.NODE_ENV === "production") {
    startHttpsServer();
  } else {
    startHttpServer();
  }
}

initServer();
