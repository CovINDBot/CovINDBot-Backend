const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Location = sequelize.define(
    "Location",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: new Date(),
      },
    },
    { sequelize }
  );

  Location.getLocation = async function () {
    return await this.findAll({});
  };

  Location.createLocation = async function (location) {
    const { name } = location;
    if (!name) return;
    const instance = await this.findOrCreate({
      where: { name: name },
      defaults: {
        name: name,
      },
    });
    return instance;
  };

  return Location;
};
