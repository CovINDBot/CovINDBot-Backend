const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      provider: { type: DataTypes.STRING, allowNull: false },
      profile_id: { type: DataTypes.STRING, allowNull: false },
      display_name: { type: DataTypes.STRING, defaultValue: "User" },
    },
    { sequelize }
  );

  User.find_or_create_from_profile = async function (profile) {
    /* Find existing user or create new User instances */
    const [instance, created] = await this.findOrCreate({
      raw: true,
      where: { provider: profile["provider"], profile_id: profile["id"] },
      defaults: {
        provider: profile["provider"],
        profile_id: profile["id"],
        display_name: profile["display_name"],
      },
    });

    return instance;
  };

  return User;
};
