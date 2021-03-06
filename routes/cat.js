"use strict";

var express = require("express");
var CatController = require("../controllers/cat");

var router = express.Router();

var multipart = require("connect-multiparty");
var multipartMiddleware = multipart({ uploadDir: "./uploads" });

router.get("/home", CatController.home);
router.post("/test", CatController.test);
router.post("/save-cat", CatController.saveCat);
router.put("/cat/:id", CatController.updateCat);
router.post(
  "/upload-image/:id",
  multipartMiddleware,
  CatController.uploadImage
);
router.get("/cat/:id?", CatController.getCat);
router.get("/cats", CatController.getCats);
router.get("/get-image/:image", CatController.getImageFile);
router.delete("/cat/:id", CatController.deleteCat);

module.exports = router;
