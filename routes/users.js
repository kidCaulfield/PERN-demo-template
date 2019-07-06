const express = require("express");
const router = express.Router();
const cors = require('cors');
const conf = require("./cors");
const usersController = require("../controllers/users")
const authenticateUser = require("./authenticate");

router.options("*", cors(conf.corsOptionsDelegate));
router.get('/users', cors(conf.corsOptionsDelegate), conf.preFlight, (req, res) => {
  res.status(200).send("To the beer emporium!");
});

router.get('/users/:id', cors(conf.corsOptionsDelegate), conf.preFlight, /*authenticateUser,*/ usersController.show);
router.post('/users', cors(conf.corsOptionsDelegate), conf.preFlight, usersController.create);

module.exports = router;