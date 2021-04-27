const fs = require("fs");
const { models } = require("../models");

const LOCATIONS = require("../constants/locations.json");

const keys = Object.keys(LOCATIONS);

keys.forEach(async (key) => {
  await models.Location.createLocation({ name: key });
  LOCATIONS[`${key}`].forEach(async (childLoc) => {
    await models.Location.createLocation({ name: childLoc });
  });
});
