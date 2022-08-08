'use strict';

var express = require('express');
var router = express.Router();

var sitetitle = "GiftMe";

var passport = require('passport'); 
var securePin = require('secure-pin');
var charSet = new securePin.CharSet();
charSet.addLowerCaseAlpha().addUpperCaseAlpha().addNumeric().randomize();

var { check, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');

var db = require('../db.js');

const saltRounds = bcrypt.genSaltSync(10);

// Select an API and endpoint to get started.

var { Client, Environment } = require('square');

const niceInvoice = require("nice-invoice");

const client = new Client({
  environment: Environment.Sandbox,
  accessToken: 'EAAAEHbS21VgSMiPqfR4AuzjW3ibRKmb7W2qupeC2e6CpebBwsoNY4suuvn4ZXK4',
})




/* GET home page. */
router.get('/', function(req, res, next) {
	//get all products.
	
	db.query('SELECT * FROM product LIMIT 10', function(err, results, fields){
		if (err) throw err;
		var products = results;		 
		res.render('index', { 
			title: sitetitle, 
			subitle: "Home",
			products: products			
		});
	});	
});

//get the filtered product
router.get('/category=:category/location=:state/minprice=:minprice/maxprice=:maxprice', function(req, res, next) {
	//get the params
	var category = req.params.category;
	var state = req.params.state;
	var minprice = req.params.minprice;
	var maxprice = req.params.maxprice;
	
	//get all products.
	db.query('SELECT * FROM product WHERE category = ? and location = ? and (product_price BETWEEN ? and ? OR product_discount BETWEEN ? and ?) ', function(err, results, fields){
		if (err) throw err;
		var products = results;		
		res.render('index', { 
			title: sitetitle, 
			subitle: "Home",
			products: products	
		});
	});	
});


/* GET registration page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: sitetitle, subtitle: "User Registration" });
});

//sign up with google

//sigh up with facebook

//sign up with twitter

//sign up with apple 


//become a seller

//

//post add to cart

router.post('/addtocart/:productId', function(req, res, next) {
	var product = req.params.productId;
	var url =  req.originalUrl;
	var cookie = req.headers.cookie
	//get thwe product
	db.query('SELECT * FROM product WHERE product_id = ?', [product], function(err, results, fields){
		if (err) throw err;
		//get the current page
		var products = results[0];
		//add to cart  if user is not logged in
		if(!req.user){
			//generate order_id
			securePin.generateString(10, charSet, function(str) {
				//insert into cart
				db.query('INSERT INTO cart (product_id, seller_id, order_id, quantity, cookie_id) VALUES (?,?,?,?,?)', [product, products.seller_id, str, 1, cookie],  function(err, results, fields){
					if (err) throw err;	
					res.redirect(url)
				});
			});							
		}else{
			//get the username
			var currentUser = req.session.passport.user.user_id;
			db.query('SELECT username FROM users WHERE user_id = ?', [currentUser], function(err, results, fields){
				//generate order_id
				var username = results[0].username;
				securePin.generateString(10, charSet, function(str) {
					//insert into cart
					db.query('INSERT INTO cart (product_id, seller_id, order_id, quantity, cookie_id, username) VALUES (?,?,?,?,?,?)', [product, products.seller_id, str, 1, cookie, username],  function(err, results, fields){
						if (err) throw err;	
						res.redirect(url)
					});
				});	
			});	
		}
	});
});	
	
	
	
	


module.exports = router;
