const { DataTypes } = require("sequelize");
const { Op } = require("sequelize");

module.exports = (sequelize) => {
  const Request = sequelize.define(
    "Request",
    {
      date_of_request: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: new Date(),
      },
      message: {
        type: DataTypes.TEXT,
        defaultValue: "",
      },
      contact: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      location: {
        type: DataTypes.STRING,
        defaultValueL: "",
      },
    },
    { sequelize }
  );

  Request.getRequests = async function (filters = {}) {
    const {
      location = "India",
      amenities = [],
      startDate = new Date() - 14,
      endDate = new Date(),
    } = filters;

    return await this.findAll({
      where: {
        location: location,
        date_of_request: {
          [Op.lte]: endDate,
          [Op.gte]: startDate,
        },
      },
      include: [
        {
          model: sequelize.models.User,
        },
        {
          model: sequelize.models.Amenity,
          where: {
            amenity_name: {
              [Op.in]: amenities,
            },
          },
        },
      ],
    });
  };

  Request.createRequest = async function (request) {
    const {
      message = "",
      contact = "",
      location = "India",
      amenities = [],
      userID,
    } = request;

    const instance = await this.create({
      message: message,
      contact: contact,
      location: location,
    });
    instance.setUser(userID);
    instance.addAmenity(amenities);
    return instance;
  };

  Request.editRequest = async function (request) {
    const {
      requestID,
      message = "",
      contact = "",
      location = "India",
      amenities = [],
      userID,
    } = request;
    if (!requestID) return;
    const instance = await Request.findOne({
      where: {
        id: requestID,
        userID: userID,
      },
    });
    if (!instance) return;
    instance.message = message;
    instance.contact = contact;
    instance.location = location;
    const newinstance = await instance.save();
    await newinstance.setAmenities(amenities);
    return newinstance;
  };

  Request.deleteRequest = async function (request) {
    const { requestID, userID } = request;
    if (!requestID) return;
    await Request.destroy({
      where: {
        id: requestID,
        userID: userID,
      },
    });
  };

  return Request;
};
