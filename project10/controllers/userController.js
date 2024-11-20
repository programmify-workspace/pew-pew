const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userController = {
    getLogin: async (req, res) => {
        try {
            res.render('login');
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ message: 'Server error' });
        }
    },
    getRegister: async (req, res) => {
        try {
            res.render('register');
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ message: 'Server error' });
        }
    },
    postLogin: async (req, res) => {
        try {
            const { email, password } = req.body;

            console.log(email, password);

            const [ user ] = await db.query(`SELECT * FROM users WHERE email =?`, [email]);

            console.log(user);

            if (user.length === 0) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            console.log(user[0].password);

            // Compare password
            const isMatch = await bcrypt.compare(password, user[0].password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const token = jwt.sign({ id: user[0].id, name: user[0].name }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
            console.log({ message: 'Login successful', token });
  
            res.cookie('token', token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              maxAge: 10*60*60*24*30 // 1 month
            });

            res.redirect('/profile');
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ message: 'Server error' });
        }
    },
    postRegister: async(req, res) => {
        try {
            const { name, email, password } = req.body;

            console.log(name, email, password);

            const [ existingUser ] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            
            console.log(existingUser);

            if (existingUser.length > 0) {
                return res.status(400).send({ message: 'Email already exists' });
            }

             // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            const [ newUser ] = await db.query('INSERT INTO users (name, email, password) VALUES (?,?,?)', [name, email, hashedPassword]);

            console.log(newUser);

            const token = jwt.sign({ id: newUser.insertId, name }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
            console.log({ message: 'Signup successful', token });
  
            res.cookie('token', token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              maxAge: 10*60*60*24*30 // 1 month
            });  

            res.redirect('/profile');

        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ message: 'Server error' });
        }
    },
    getCurrentUser: async (req, res) => {
        try {
            // Get token from cookies
            const token = req.cookies.token;
            
            if (!token) {
                return res.status(401).json({ error: 'No token found' });
            }
            
            // Verify token and get user ID
            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
            
            // Get user data from database
            const [user] = await db.query(
                'SELECT id, name, avatar FROM users WHERE id = ?', 
                [decoded.id]
            );
            
            if (user.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            // Send user data
            res.json(user[0]);
            
        } catch (error) {
            console.error('Error getting current user:', error);
            res.status(401).json({ error: 'Invalid token' });
        }
    },
    getProfile: async (req, res) => {
        try {
            const token = req.cookies.token;

            console.log(token);

            // Verify token and get user ID
            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

            console.log(decoded);

            // Get user data from database
            const [user] = await db.query(
                'SELECT id, name, email, bio, role, avatar FROM users WHERE id = ?', 
                [decoded.id]
            );

            user.forEach(user => {
                if (!user.bio) {
                    user.bio = 'A wonderful Person.';
                }
                user.avatar = user.avatar ? `/uploads/avatars/${user.avatar}` : null;
            });
            
            const [ blogs ] = await db.query('SELECT * FROM blogs WHERE userId = ? ORDER BY created_at DESC LIMIT 6', [decoded.id]);
            
            res.render('profile', { user: user[0], blogs });
        } catch (error) {
            console.error('Error getting current user:', error);
            res.status(401).json({ error: 'Invalid token' });
        }
    },
    getEditProfile: async (req, res) => {
        try {
            const token = req.cookies.token;

            if (!token) {
                return res.redirect('/login');
            }

            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

            if (!decoded) {
                return res.redirect('/login');
            }

            const [user] = await db.query(
                'SELECT id, name, email, bio, role, avatar FROM users WHERE id = ?', 
                [decoded.id]
            );

            console.log(user);

            user.forEach(user => {
                if (!user.bio) {
                    user.bio = 'A wonderful Person.';
                }
                user.avatar = user.avatar ? `/uploads/avatars/${user.avatar}` : null;
            });

            res.render('editProfile', { user: user[0] });
        } catch (error) {
            console.error('Something went wrong: ', error);
        }
    },
    postEditProfile: async (req, res) => {
        try {
            const { name, email, role, bio, password } = req.body;
            const avatar = req.file ? req.file.filename : null;
            
            const token = req.cookies.token;
            
            if (!token) {
                return res.redirect('/login');
            }
            
            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
            
            if (!decoded) {
                return res.redirect('/login');
            }
            
            // Validate required fields
            if (!name || !email || !role || !bio || !password) {
                return res.render('editProfile', { 
                    error: 'All fields are required',
                    user: { name, email, role, bio } // Send back the form data
                });
            }
    
            // Hash the new password
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Build the update query dynamically based on whether avatar was uploaded
            let updateQuery = `
                UPDATE users 
                SET name = ?,
                    email = ?,
                    role = ?,
                    bio = ?,
                    password = ?
            `;
            let queryParams = [name, email, role, bio, hashedPassword];
    
            if (avatar) {
                updateQuery += `, avatar = ?`;
                queryParams.push(avatar);
            }
    
            updateQuery += ` WHERE id = ?`;
            queryParams.push(decoded.id);
    
            // Execute the update query
            const [result] = await db.query(updateQuery, queryParams);
    
            if (result.affectedRows === 0) {
                throw new Error('Failed to update user profile');
            }
    
            // Redirect on success
            res.redirect('/profile');
    
        } catch (error) {
            console.error('Error updating profile:', error);
            
            // Handle specific errors
            if (error.code === 'ER_DUP_ENTRY') {
                return res.render('editProfile', {
                    error: 'Email address is already in use',
                    user: { name, email, role, bio }
                });
            }
    
            res.render('editProfile', {
                error: 'An error occurred while updating your profile',
                user: { name, email, role, bio }
            });
        }
    }     
}

module.exports = userController;