var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  title: {type: String, unique:true},
  brand: String,
  description: String,
  picture: String,
  ingredientList: String,
  price: String,

});

var Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
