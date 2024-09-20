import express from 'express';
import connection from '../config/database.js';
const router = express.Router();

//Create Route for Load Product Data
router.get("/", (request, response) => {

	const query = `SELECT * FROM product LIMIT 3`;

	//Execute Query
	connection.query(query, (error, result) => {

		if(!request.session.cart)
		{
			request.session.cart = [];
		}

		response.render('product', { products : result, cart : request.session.cart });

	});

});

//Create Route for Add Item into Cart
router.post('/add_cart', (request, response) => {

	const product_id = request.body.product_id;

	const product_name = request.body.product_name;

	const product_price = request.body.product_price;

	let count = 0;

	for(let i = 0; i < request.session.cart.length; i++)
	{

		if(request.session.cart[i].product_id === product_id)
		{
			request.session.cart[i].quantity += 1;

			count++;
		}

	}

	if(count === 0)
	{
		const cart_data = {
			product_id : product_id,
			product_name : product_name,
			product_price : parseFloat(product_price),
			quantity : 1
		};

		request.session.cart.push(cart_data);
	}

	response.redirect("/");

});

//Create Route for Remove Item from Shopping Cart

router.get('/remove_item', (request, response) => {

	const product_id = request.query.id;

	for(let i = 0; i < request.session.cart.length; i++)
	{
		if(request.session.cart[i].product_id === product_id)
		{
			request.session.cart.splice(i, 1);
		}
	}
	response.redirect("/");

});

export default router;