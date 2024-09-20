import express from 'express';
import db from '../config/database.js';
import bcrypt from 'bcryptjs';
const usersRouter = express.Router();

// Routes
usersRouter.get('/', (req, res) => {
    db.query('SELECT * FROM posts ORDER BY created_at DESC', (err, results) => {
        if (err) throw err;
        res.render('index', { posts: results });
    });
});

// Register
usersRouter.get('/register', (req, res) => {
    res.render('register');
});

usersRouter.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
        if (err) throw err;
        res.redirect('/login');
    });
});

// Login
usersRouter.get('/login', (req, res) => {
    res.render('login');
});

usersRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) throw err;
        if (results.length > 0 && bcrypt.compareSync(password, results[0].password)) {
            req.session.user = results[0];
            db.query('SELECT * FROM posts ORDER BY created_at DESC', (err, results) => {
                if (err) throw err;
                res.render('admin', { posts: results });
            });
        } else {
            res.redirect('/login');
        }
    });
});

// Logout
usersRouter.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Create Post
usersRouter.get('/create', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('create');
});

usersRouter.post('/create', (req, res) => {
    const { title, content } = req.body;
    db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

//Edit Post 
usersRouter.get('/edit/:id', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    db.query('SELECT * FROM posts WHERE id = ?', [req.params.id], (err, result) => {
        if (err) throw err;
        res.render('edit_post', { post: result[0] });
    });
});

usersRouter.post('/edit/:id', (req, res) => {
    const { title, content } = req.body;
    db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

//Delete Post
usersRouter.post('/delete/:id', (req, res) => {
    if (!req.session.user) return res.redirect('/login');

    db.query('DELETE FROM comments WHERE post_id = ?', [req.params.id], (err) => {
        if (err) throw err;
        db.query('DELETE FROM posts WHERE id = ?', [req.params.id], (err) =>  {
            if (err) throw err;
        });
        });
	res.redirect("/");
});

usersRouter.get('/post/:id', (req, res) => {
    const postId = req.params.id;
    db.query('SELECT * FROM posts WHERE id = ?', [postId], (err, postResults) => {
        if (err) throw err;
        db.query('SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC', [postId], (err, commentResults) => {
            if (err) throw err;
            res.render('post', { post: postResults[0], comments: commentResults });
        });
    });
});

// Add Comment
usersRouter.post('/post/:id/comment', (req, res) => {
    const postId = req.params.id;
    const { username, content } = req.body;
    db.query('INSERT INTO comments (post_id, username, content) VALUES (?, ?, ?)', [postId, username, content], (err) => {
        if (err) throw err;
        res.redirect(`/post/${postId}`);
    });
});

export default usersRouter;
