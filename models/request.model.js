const { DataTypes } = require("sequelize");

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

  return Request;
};
