"use strict";

const { Test } = require("tslint");

var Cat = require("../models/cat");

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
};

module.exports = controller;
