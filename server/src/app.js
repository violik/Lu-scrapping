const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();

var Product = require("../models/product");
const Scrapper = require('../scrapper/scrapper');

async function test(){
	try {
		await Scrapper.scrap();
	} catch(err) {}
}
//API: Get /products => sort all products in database
app.get('/products', (req, res) => {
  	test();
   	setTimeout(function(){
   		Product.find({}, 'title description brand picture ingredientList price type' , function (error, products) {
	  if (error) { console.error(error); }
	  res.send({
			products: products
		})
	}).sort({_id:-1})
   	}, 4500);
})
//API: Delete /products => delete all products in database

app.delete('/products', (req, res) => {
	Product.collection.remove({}, function(err, post){
		if (err)
			res.send(err)
		res.send({
			success: true
		})
	})
})

app.listen(process.env.PORT || 8081)
