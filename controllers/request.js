const express = require("express");
const router = express.Router();
const sequelize = require("../models");
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const getRequestController = async (req, res) => {
  const filters = {
    startDate: new Date(req.query.startDate),
    endDate: new Date(req.query.endDate),
    location: req.query.location,
    amenities: req.query.amenities,
  };
  const data = await sequelize.models.Request.getRequests(filters);
  res.status(200).send({
    data: data,
  });
};

const postRequestController = async (req, res) => {
  const request = {
    message: req.body.message,
    contact: req.body.contact,
    location: req.body.location,
    amenities: req.body.amenities,
    userID: req.user.id,
  };
  await sequelize.models.Location.createLocation({
    name: req.body.location,
  });
  await sequelize.models.Request.createRequest(request);
  res.send({ create: true });
};

const putRequestController = async (req, res) => {
  const request = {
    message: req.body.message,
    contact: req.body.contact,
    location: req.body.location,
    amenities: req.body.amenities,
    requestID: req.body.requestID,
    userID: req.user.id,
  };
  await sequelize.models.Location.createLocation({
    name: req.body.location,
  });
  await sequelize.models.Request.editRequest(request);
  res.send({ create: true });
};

const deleteRequestController = async (req, res) => {
  const request = {
    requestID: req.body.requestID,
    userID: req.user.id,
  };
  await sequelize.models.Request.deleteRequest(request);
  res.send({ create: true });
};

router.route("/").get(getRequestController);
router.route("/protect/").post(postRequestController);
router.route("/protect/").put(putRequestController);
router.route("/protect/").delete(deleteRequestController);

module.exports = router;
