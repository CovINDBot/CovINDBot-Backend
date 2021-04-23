const express = require("express");
const router = express.Router();

const getInfoController = async (_req, res) => {
  res.status(200).send({
    name: "CovidIndBot",
    description:
      "Get information regarding the availability of hospital beds, oxygen cylinders, remdesivir and other amenities across different locations in India.",
    author: "Siddharth Singha Roy",
    dev_url: "https://github.com/CovINDBot",
  });
};

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.route("/").get(getInfoController);

module.exports = router;
