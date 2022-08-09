exports.invoice(item, quantity, user){
	this.item = item;
	this.quantity = quantity;
	this.user = user;
	
	//get the product information
	db.query('SELECT * FROM product WHERE product_id = ?', [item], function(err, results, fields){
		if (err) throw err;
		//get the current page
		var products = results[0];
	});	
}

