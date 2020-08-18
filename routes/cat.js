"use strict";

var express = require("express");
var CatController = require("../controllers/cat");

var router = express.Router();

router.get("/home", CatController.home);
router.post("/test", CatController.test);
router.post("/save-cat", CatController.saveCat);

module.exports = router;
