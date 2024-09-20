import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import usersRouter from './routes/usersRouter.js';

const app = express();

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.set('view engine', 'ejs');

// ROUTES
app.use('/', usersRouter)
// Register
app.use('/register', usersRouter)
// Login
app.use('/login', usersRouter)
// Logout
app.use('/logout', usersRouter);

// Create Post
app.use('/create', usersRouter)
//Edit Post
app.use('/edit/:id', usersRouter);
//Delete Post
app.use('/delete/:id', usersRouter)

// View Post
app.use('/post/:id', usersRouter);
// Add Comment
app.use('/post/:id/comment', usersRouter);


// Start server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
