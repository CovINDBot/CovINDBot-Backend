const { logger } = require("../logger");
const controllers = require("../controllers");

module.exports.registerRoutes = (app) => {
  app.use("/request", controllers.request);
  app.use("/offer", controllers.offer);
  app.use("/amenity", controllers.amenity);
};

module.exports.registerErrorHandlers = (app) => {
  app.use(function (err, req, res, _next) {
    logger.error(err.message);
    res.status(err.status || 500);
    res.render("500", {
      message: err.message,
      error: err,
    });
  });
};
