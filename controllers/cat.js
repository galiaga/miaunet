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
};

module.exports = controller;
