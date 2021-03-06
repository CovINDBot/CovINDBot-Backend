const { DataTypes, Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize) => {
  const Offer = sequelize.define(
    "Offer",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      date_of_offer: {
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
        defaultValue: "",
      },
    },
    { sequelize }
  );

  Offer.getOffers = async function (filters = {}) {
    const {
      location = "India",
      amenities = [],
      startDate = new Date(new Date().setDate(new Date().getDate() - 14)),
      endDate = new Date(),
    } = filters;
    return await this.findAll({
      where: {
        location: location.toLowerCase(),
        date_of_offer: {
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

  Offer.createOffer = async function (offer) {
    const {
      message = "",
      contact = "",
      location = "India",
      amenities = [],
      userID,
    } = offer;

    const instance = await this.create({
      message: message,
      contact: contact,
      location: location.toLowerCase(),
      id: uuidv4(),
    });
    await instance.setUser(userID);
    await instance.addAmenity(amenities);
    return instance;
  };

  Offer.editOffer = async function (offer) {
    const {
      offerID,
      message = "",
      contact = "",
      location = "India",
      amenities = [],
    } = offer;
    if (!offerID) return;
    const instance = await Offer.findOne({
      where: {
        id: offerID,
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

  Offer.deleteOffer = async function (offer) {
    const { offerID } = offer;
    if (!offerID) return;
    await Offer.destroy({
      where: {
        id: offerID,
      },
    });
  };

  return Offer;
};
