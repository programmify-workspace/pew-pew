const express = require('express');

const mysql = require('mysql');

const body_parser = require('body-parser');
const path = require('path')

const session = require('express-session');
const ejs =require('ejs')

const app = express();

app.use(body_parser.urlencoded({ extended : false }));

app.use(body_parser.json());


//middleware for serving static file
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));


//Set up EJS as template engine
app.set('view engine', 'ejs');

app.get("/product", (req, res) =>{
	res.render('product');

})
    
//Make MySQL Database Connection
const connection = mysql.createConnection({
	host : 'localhost',
	database : 'product_quantity',
	user : 'root',
	password : ''
});

//Check MySQL Database Connection
connection.connect((error) => {
	console.log('MySQL Database is connected Successfully');
});

//Set up Session Middleware
app.use(session({
	secret : '1234567890abcdefghijklmnopqrstuvwxyz',
	resave : false,
	saveUninitialized : true,
	cookie : { secure : false }
}));

//Create Route for Load Product Data
app.get("/", (request, response) => {

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
app.post('/add_cart', (request, response) => {

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
app.get('/remove_item', (request, response) => {

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


// Add this route to your Express app
app.delete('/delete_product', (req, res) => {
    const product_id = req.body.product_id;

    const query = 'DELETE FROM product WHERE product_id = ?';

    connection.query(query, [product_id], (error, result) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).send('Internal Server Error');
        }
        res.sendStatus(200);  // Send a success status code
    });
});


// Route to display the checkout form
app.get('/checkout', (req, res) => {
    if (!req.session.cart || req.session.cart.length === 0) {
        return res.redirect('/');
    }
    res.render('checkout', { cart: req.session.cart });
});

// Route to handle checkout form submission
app.post('/checkout', (req, res) => {
    const { name, email, shipping_address, billing_address } = req.body;
    const cart = req.session.cart;

    if (!cart || cart.length === 0) {
        return res.redirect('/');
    }

    let totalAmount = 0;
    cart.forEach(item => {
        totalAmount += item.quantity * item.product_price;
    });

    // Insert order into database
    const orderQuery = 'INSERT INTO orders (customer_name, customer_email, shipping_address, billing_address, total_amount) VALUES (?, ?, ?, ?, ?)';
    connection.query(orderQuery, [name, email, shipping_address, billing_address, totalAmount], (err, result) => {
        if (err) {
            console.error('Error inserting order:', err);
            return res.status(500).send('Internal Server Error');
        }

        const orderId = result.insertId;

        // Insert order items into database
        const orderItems = cart.map(item => [orderId, item.product_id, item.product_name, item.quantity, item.product_price]);
        const itemsQuery = 'INSERT INTO order_items (order_id, product_id, product_name, quantity, price) VALUES ?';
        connection.query(itemsQuery, [orderItems], (err) => {
            if (err) {
                console.error('Error inserting order items:', err);
                return res.status(500).send('Internal Server Error');
            }

            // Clear cart
            req.session.cart = [];
            res.redirect('/order_confirmation');
        });
    });
});

// Route for order confirmation
app.get('/order_confirmation', (req, res) => {
    res.render('order_confirmation');
});


app.listen(3000, () => {

	console.log('Server has started on port number 3000');

});
