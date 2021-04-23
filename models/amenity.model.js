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
    { sequelize }
  );

  return Amenity;
};
