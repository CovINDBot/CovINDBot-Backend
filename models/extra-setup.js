function applyExtraSetup(sequelize) {
  const {
    Amenity,
    Offer,
    Request,
    RequestAmenity,
    OfferAmenity,
    User,
  } = sequelize.models;
  Request.belongsTo(User);
  User.hasOne(Request);

  Offer.belongsTo(User);
  User.hasOne(Offer);

  Request.belongsToMany(Amenity, { through: RequestAmenity });
  Amenity.belongsToMany(Request, { through: RequestAmenity });

  Offer.belongsToMany(Amenity, { through: OfferAmenity });
  Amenity.belongsToMany(Offer, { through: OfferAmenity });
}

// One user will be associated with 1 Request
// One user will be associated with 1 Offer
// Offer can have multiple amenity
// Request can have multiple amenity

module.exports = { applyExtraSetup };
