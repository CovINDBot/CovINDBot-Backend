const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Amenity = sequelize.define(
    "Amenity",
    {
      amenity_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { sequelize }
  );

  return Amenity;
};
