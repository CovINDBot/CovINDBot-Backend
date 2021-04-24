const express = require("express");
const router = express.Router();
const sequelize = require("../models");
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const getOfferController = async (req, res) => {
  const filters = {
    startDate: new Date(req.query.startDate),
    endDate: new Date(req.query.endDate),
    location: req.query.location,
    amenities: req.query.amenities,
  };
  const data = await sequelize.models.Offer.getOffers(filters);
  res.status(200).send({
    data: data,
  });
};

const postOfferController = async (req, res) => {
  const offer = {
    message: req.body.message,
    contact: req.body.contact,
    location: req.body.location,
    amenities: req.body.amenities,
    userID: 1,
  };
  await sequelize.models.Location.createLocation({
    name: req.body.location,
  });
  await sequelize.models.Offer.createOffer(offer);
  res.send({ create: true });
};

const putOfferController = async (req, res) => {
  const offer = {
    message: req.body.message,
    contact: req.body.contact,
    location: req.body.location,
    amenities: req.body.amenities,
    offerID: req.body.offerID,
    userID: req.user.id,
  };
  await sequelize.models.Offer.editOffer(offer);
  res.send({ create: true });
};

const deleteOfferController = async (req, res) => {
  const offer = {
    offerID: req.body.offerID,
    userID: req.user.id,
  };
  await sequelize.models.Offer.deleteOffer(offer);
  res.send({ create: true });
};

router.route("/").get(getOfferController);
router.route("/protect/").post(postOfferController);
router.route("/protect/").put(putOfferController);
router.route("/protect/").delete(deleteOfferController);

module.exports = router;
