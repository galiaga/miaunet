"use strict";

const { Test } = require("tslint");

var Cat = require("../models/cat");
var fs = require("fs");
const { fstat } = require("fs");
const { exists } = require("../models/cat");
var path = require("path");
const { RSA_NO_PADDING } = require("constants");

var controller = {
  home: function (req, res) {
    return res.status(200).send({
      message: "Soy la home",
    });
  },

  test: function (req, res) {
    return res.status(200).send({
      message: "Soy el método o acción test del controlador de cat",
    });
  },

  saveCat: function (req, res) {
    var cat = new Cat();

    var params = req.body;
    cat.name = params.name;
    cat.age_years = params.age_years;
    cat.age_months = params.age_months;
    cat.breed = params.breed;
    cat.image = null;

    cat.save((err, catStored) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error al guardar el documento." });

      if (!catStored)
        return res
          .status(404)
          .send({ message: "No se ha podido guardar el documento." });

      return res.status(200).send({ cat: catStored });
    });
  },

  // Subir imagenes
  uploadImage: function (req, res) {
    var catId = req.params.id;
    var fileName = "Imagen no subida...";

    if (req.files) {
      var filePath = req.files.image.path;
      var fileSplit = filePath.split("\\");
      var fileName = fileSplit[1];

      Cat.findByIdAndUpdate(
        catId,
        { image: fileName },
        { new: true },
        (err, catUpdated) => {
          if (err)
            return res
              .status(500)
              .send({ message: "La imagen no se ha subido" });

          if (!catUpdated)
            return res.status(404).send({ message: "El gato no existe." });

          return res.status(200).send({
            cat: catUpdated,
          });
        }
      );
    } else {
      return res.status(200).send({
        message: fileName,
      });
    }
  },

  // Actualizar documento
  updateCat: function (req, res) {
    var catId = req.params.id;
    var update = req.body;

    Cat.findByIdAndUpdate(catId, update, { new: true }, (err, catUpdated) => {
      if (err) return res.status(500).send({ message: "Error al actualizar" });

      if (!catUpdated)
        return res
          .status(404)
          .send({ message: "No existe el gato para actualizar." });

      return res.status(200).send({
        cat: catUpdated,
      });
    });
  },

  getCat: function (req, res) {
    var catId = req.params.id;

    if (catId == null)
      return res.status(404).send({ message: "El gato no existe." });

    Cat.findById(catId, (err, cat) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error al devolver los datos." });

      if (!cat) return res.status(404).send({ message: "El gato no existe." });

      return res.status(200).send({ cat });
    });
  },

  // Listar gatos
  getCats: function (req, res) {
    Cat.find({}).exec((err, cats) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error al devolver los datos." });

      if (!cats)
        return res.status(404).send({ message: "No hay catos para mostrar." });

      return res.status(200).send({ cats });
    });
  },

  // Mostrar imagen
  getImageFile: function (req, res) {
    var file = req.params.image;
    var path_file = "./uploads/" + file;

    fs.exists(path_file, (exists) => {
      if (exists) {
        return res.sendFile(path.resolve(path_file));
      } else {
        return res.status(200).send({
          message: "No existe la imagen.",
        });
      }
    });
  },

  // Borrar elemento
  deleteCat: function (req, res) {
    var catId = req.params.id;

    Cat.findByIdAndDelete(catId, (err, catRemoved) => {
      if (err)
        return res
          .status(500)
          .send({ message: "No se ha podido borrar el elemento." });

      if (!catRemoved)
        return res
          .status(404)
          .send({ message: "No se encuentra el elemento." });

      return res.status(200).send({
        cat: catRemoved,
      });
    });
  },
};

module.exports = controller;
