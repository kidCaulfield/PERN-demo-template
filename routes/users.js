const express = require("express");
const router = express.Router();
const cors = require('cors');
const conf = require("./cors");

router.options("*", cors(conf.corsOptionsDelegate));
router.get('/users', cors(conf.corsOptionsDelegate), conf.preFlight, (req, res) => {
  res.status(200).send("To the beer emporium!");
});

module.exports = router;