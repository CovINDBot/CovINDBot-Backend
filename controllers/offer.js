const express = require("express");
const router = express.Router();
const sequelize = require("../models");
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const getOfferController = async (_req, res) => {
  const data = await sequelize.models.Offer.getOffers();
  res.status(200).send({
    data: data,
  });
};

router.route("/").get(getOfferController);

module.exports = router;
