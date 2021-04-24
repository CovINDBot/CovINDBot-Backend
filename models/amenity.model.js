const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Amenity = sequelize.define(
    "Amenity",
    {
      amenity_name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
    },
    { timestamps: false, sequelize }
  );

  Amenity.getOffers = async function () {
    return await this.findAll();
  };

  return Amenity;
};
