var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CatSchema = Schema({
  name: String,
  age_years: Number,
  age_months: Number,
  breed: String,
  image: String,
});

module.exports = mongoose.model("Cat", CatSchema);
