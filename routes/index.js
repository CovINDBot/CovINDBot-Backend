const { logger } = require("../logger");
const controllers = require("../controllers");
const google = require("../config/google.auth");

const authMiddleware = async (req, res, next) => {
  try {
    if (req.body.authType === "Google") {
      const instance = await google(req.body.token);
      req.user = instance;
      next();
    } else {
      res.status(401).send({ auth: false, error: "Token not provided" });
    }
  } catch (err) {
    res.status(401).send({ auth: false, error: err });
  }
};

module.exports.registerRoutes = (app) => {
  app.use("/request", controllers.request);
  app.use("/offer", controllers.offer);
  app.use("/amenity", controllers.amenity);
  app.use("/location", controllers.location);
};

module.exports.registerAuthRoutes = (app) => {
  app.use("/request/protect/", authMiddleware);
  app.use("/offer/protect/", authMiddleware);
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
