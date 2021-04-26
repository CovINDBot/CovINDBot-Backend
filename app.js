const express = require("express");
const compression = require("compression");
const cors = require('cors')
const routes = require("./routes");
const { sanitiseInput } = require("./utils");

// Set up the express app
const app = express();

// Will attempt to compress responses.
app.use(compression());
app.use(cors());

// Parse incoming requests data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("*", (req, _res, next) => {
  req.body = sanitiseInput(req.body);
  next();
});

routes.registerAuthRoutes(app);
routes.registerRoutes(app);
routes.registerErrorHandlers(app);

module.exports = {
  app,
};
