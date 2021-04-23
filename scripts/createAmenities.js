const { models } = require("../models");

const { AMENITIES } = require("../constants/amenities");

AMENITIES.forEach(async (amenity) => {
  await models.Amenity.findOrCreate({
    where: {
      amenity_name: amenity,
    },
    defaults: {
      amenity_name: amenity,
    },
  });
});
