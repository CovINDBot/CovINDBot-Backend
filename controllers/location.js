const express = require("express");
const router = express.Router();
const sequelize = require("../models");

const getLocationController = async (_req, res) => {
  const data = await sequelize.models.Location.getLocation();
  res.send({
    data,
  });
};

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.route("/").get(getLocationController);

module.exports = router;
