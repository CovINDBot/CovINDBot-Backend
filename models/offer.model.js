const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Offer = sequelize.define(
    "Offer",
    {
      date_of_offer: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: new Date(),
      },
      message: {
        type: DataTypes.STRING,
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

  return Offer;
};
