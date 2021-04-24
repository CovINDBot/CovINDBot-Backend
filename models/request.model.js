const { DataTypes } = require("sequelize");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize) => {
  const Request = sequelize.define(
    "Request",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
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
      startDate = new Date(new Date().setDate(new Date().getDate() - 14)),
      endDate = new Date(),
    } = filters;

    return await this.findAll({
      where: {
        location: location.toLowerCase(),
        date_of_request: {
          [Op.lte]: endDate,
          [Op.gte]: startDate,
        },
      },
      include: [
        {
          model: sequelize.models.Amenity,
          where: {
            amenity_name: {
              [Op.in]: amenities,
            },
          },
          attributes: ["amenity_name"],
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
      location: location.toLowerCase(),
      id: uuidv4(),
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
    instance.location = location.toLowerCase();
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
