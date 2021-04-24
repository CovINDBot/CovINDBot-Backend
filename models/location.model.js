const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize) => {
  const Location = sequelize.define(
    "Location",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: new Date(),
      },
    },
    {
      timestamps: false,
      sequelize,
    }
  );

  Location.getLocation = async function () {
    return await this.findAll({});
  };

  Location.createLocation = async function (location) {
    const { name } = location;
    if (!name) return;
    const instance = await this.findOrCreate({
      where: { name: name.toLowerCase() },
      defaults: {
        name: name.toLowerCase(),
        id: uuidv4(),
      },
    });
    return instance;
  };

  return Location;
};
