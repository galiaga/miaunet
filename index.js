"use strict";

var mongoose = require("mongoose");
var app = require("./app");
var port = 3700;

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/pets")
  .then(() => {
    console.log("Conexión a Pets ok. :)");

    // Creación del servidor
    app.listen(port, () => {
      console.log("Servidor corriendo perfectamente en la URL localhost:3700");
    });
  })
  .catch((err) => console.log(err));

// Conexión a Firebase

const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();
