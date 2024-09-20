import express from 'express';
import body_parser from 'body-parser';
import session from 'express-session';
import router from './routes/controllers.js';

const app = express();

app.use(body_parser.urlencoded({ extended : false }));

app.use(body_parser.json());

//middleware for serving static file
app.use(express.static('public'));

//Set up EJS as template engine
app.set('view engine', 'ejs');

//Set up Session Middleware
app.use(session({
	secret : '1234567890abcdefghijklmnopqrstuvwxyz',
	resave : false,
	saveUninitialized : true,
	cookie : { secure : false }
}));

app.use("/", router)
app.use('/add_cart', router)
app.use('/remove_item', router)

app.listen(3000, () => {

	console.log('Server has started on port number 3000');

});