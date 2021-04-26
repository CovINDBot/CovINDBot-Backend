const dotenvfile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
require("dotenv").config({ path: dotenvfile });
const sequelize = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function google(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const userid = payload["sub"];
  const name = payload["name"];
  const profile = {
    provider: "Google",
    id: userid,
    display_name: name,
  };

  const instance = sequelize.models.User.find_or_create_from_profile(profile);
  return instance;
}

module.exports = google;
