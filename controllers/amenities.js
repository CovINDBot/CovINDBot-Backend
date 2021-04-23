const express = require("express");
const router = express.Router();
const sequelize = require("../models");

const getAmenityController = async (_req, res) => {
  const data = await sequelize.models.Amenity.getOffers();
  res.send({
    data,
  });
};

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.route("/").get(getAmenityController);

module.exports = router;
