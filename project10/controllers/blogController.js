const db = require('../config/db');
const jwt = require('jsonwebtoken');

const blogController = {
    getIndex: async (req, res) => {
        try {
            // Initialize user with default values
            let user = {
                id: null,
                name: 'Guest',
                avatar: '/uploads/avatars/person.png'  // Adjust this path to your default avatar image
            };
            
            // Try to get user information if token exists
            const token = req.cookies.token;
            if (token) {
                try {
                    const decodedUserId = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET).id;
                    const [userResult] = await db.query('SELECT id, name, avatar FROM users WHERE id = ?', [decodedUserId]);
                    
                    if (userResult.length > 0) {
                        user = userResult[0];
                        // Use the avatar from database or fall back to default
                        user.avatar = user.avatar ? `/uploads/avatars/${user.avatar}` : '/uploads/avatars/person.pngg';
                    }
                } catch (tokenError) {
                    console.log('Token verification failed:', tokenError.message);
                    res.clearCookie('token');
                }
            }

            const [featuredBlogs] =  await db.query('SELECT * FROM blogs ORDER BY views DESC LIMIT 1');

            const [featuredBlogsUser] = await db.query('SELECT id, name, role, avatar FROM users WHERE id =?', [featuredBlogs[0].userId]);

            // Fetch blogs regardless of authentication status
            const [blogs] = await db.query('SELECT * FROM blogs ORDER BY created_at DESC LIMIT 6');

            if (blogs.length === 0) {
                return res.render('index', { user, blogs: [], featuredBlogs: null, featuredBlogsUser: null });
            }

            // Get user information for each blog
            const blogUserIds = [...new Set(blogs.map(blog => blog.userId))];
            const [blogUsers] = await db.query(
                'SELECT id, name, bio, role, avatar FROM users WHERE id IN (?)',
                [blogUserIds]
            );

            // Create a map of users for efficient lookup
            const userMap = new Map(
                blogUsers.map(user => [user.id, {
                    id: user.id,
                    name: user.name,
                    bio: user.bio,
                    role: user.role,
                    // Use the avatar from database or fall back to default
                    avatar: user.avatar ? `/uploads/avatars/${user.avatar}` : '/uploads/avatars/person.png'
                }])
            );

            // Attach user info to each blog
            blogs.forEach(blog => {
                blog.user = userMap.get(blog.userId) || {
                    id: null,
                    name: 'Unknown User',
                    avatar: '/uploads/avatars/person.png'
                };
                blog.coverImage = blog.coverImage ? `/uploads/${blog.coverImage}` : null;
            });

            featuredBlogsUser[0].avatar = featuredBlogsUser[0].avatar ? `/uploads/avatars/${featuredBlogsUser[0].avatar}` : null;

            featuredBlogs.forEach(blog => { 
                blog.user = featuredBlogsUser[0];
                blog.coverImage = blog.coverImage ? `/uploads/${blog.coverImage}` : null;
            });

            console.log(featuredBlogs[0]);

            res.render('index', { user, blogs, featuredBlogs: featuredBlogs[0] });
            
        } catch (error) {
            console.error('Error in getIndex:', error);
            res.status(500).render('error', { 
                message: 'An error occurred while loading the page',
                user: {
                    id: null,
                    name: 'Guest',
                    avatar: '/uploads/avatars/person.png'
                }
            });
        }
    },
    getBlogById: async (req, res) => {
        try {
            const { id } = req.params;

            const token = req.cookies.token;

            let user = {
                id: null,
                name: 'Guest',
                avatar: '/uploads/avatars/person.png'
            };

            if (token) {
                try {
                    const decodedUserId = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET).id;
                    const [userResult] = await db.query('SELECT id, name, role, avatar FROM users WHERE id = ?', [decodedUserId]);
                    
                    if (userResult.length > 0) {
                        user = userResult[0];
                        // Use the avatar from database or fall back to default
                        user.avatar = user.avatar ? `/uploads/avatars/${user.avatar}` : '/uploads/avatars/person.png';
                    }
                } catch (tokenError) {
                    console.log('Token verification failed:', tokenError.message);
                    res.clearCookie('token');
                }
            }

            const [ result ] = await db.query('SELECT * FROM blogs WHERE id =?', [id]);

            if (result.length === 0) {
                return res.status(404).send('Blog not found');
            }

            const updatedViews = parseInt(result[0].views, 10) + 1;

            await db.query('UPDATE blogs SET views = ? WHERE id = ?', [updatedViews, id]);

            const [ blogUser ] = await db.query('SELECT id, name, role, avatar FROM users WHERE id =?', [result[0].userId]);

            result[0].user = blogUser[0];

            result.forEach(blog => {
                blog.user.avatar = blogUser[0].avatar ? `/uploads/avatars/${blogUser[0].avatar}` : null;
            })

            console.log(result[0]);

            res.render('blog', { 
                blog: {
                    ...result[0], 
                    views: updatedViews,
                    coverImage: result[0].coverImage ? `/uploads/${result[0].coverImage}` : null
                },
                user
            });
        } catch (error) {
            console.log(error);
        }
    },
    getAllBlogs: async (req, res) => {
        try {
            const token = req.cookies.token;

            if (!token) {
                return res.redirect('/login');
            }

            const decodedUserId = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET).id;

            if (!decodedUserId) {
                return res.redirect('/login');
            }

            const page = parseInt(req.query.page, 10) || 1;
            const limit = 4;
            const offset = (page - 1) * limit;

            const [userResult] = await db.query('SELECT id, name, avatar FROM users WHERE id = ?', [decodedUserId]);
            
            if (userResult.length > 0) {
                user = userResult[0];
                // Use the avatar from database or fall back to default
                user.avatar = user.avatar ? `/uploads/avatars/${user.avatar}` : '/uploads/avatars/person.png';
            }

            const [[{ count }]] = await db.query(
                'SELECT COUNT(*) as count FROM blogs WHERE userId = ?', 
                [decodedUserId]
            );

            const [blogs] = await db.query('SELECT * FROM blogs WHERE userId = ? ORDER BY created_at DESC LIMIT ? OFFSET ?', [decodedUserId, limit, offset]);

            blogs.forEach(blog => {
                blog.coverImage = blog.coverImage ? `/uploads/${blog.coverImage}` : null;
            });

            const totalPages = Math.ceil(count / limit);

            console.log({
                currentPage: page,
                totalPages,
                totalCount: count,
                blogsLength: blogs.length,
                offset
            });

            res.render('allBlogs', { blogs, user, page, totalPages });
        } catch (error) {
            console.error('Error getting all blogs:', error);
            res.status(500).send("An error occurred while loading the page");
        }
    },
    getCreateBlog: async (req, res) => {
        try {
            const token = req.cookies.token;

            if (!token) {
                return res.redirect('/login');
            }

            const decodedUserId = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET).id;

            const [userResult] = await db.query('SELECT id, name, avatar FROM users WHERE id = ?', [decodedUserId]);
            
            if (userResult.length > 0) {
                user = userResult[0];
                // Use the avatar from database or fall back to default
                user.avatar = user.avatar ? `/uploads/avatars/${user.avatar}` : '/uploads/avatars/person.png';
            }

            res.render('createBlog', { user });
        } catch (error) {
            console.log(error);
            res.status(500).send("An error occurred while loading the page");
        }
    },
    createBlog: async (req, res) => {
        try {
            const { title, content } = req.body;
            const coverImage = req.file ? req.file.filename : null; // Access the file name of the uploaded image
            
            console.log(title, content, coverImage);

            const token = req.cookies.token;

            if (!token) {
              return res.redirect('/login');
            }
        
            console.log(token);
            console.log(req.user);
            const decodedUserId = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET).id;

            const [ result ] = await db.query('INSERT INTO blogs (userId, title, content, coverImage) VALUES (?,?,?,?)', [decodedUserId, title, content, coverImage]);

            console.log(result);

            const blogId = result.insertId;

            res.redirect('/blog/' + blogId);
        } catch (error) {
            console.log(error);
            res.status(500).send("An error occurred while creating the blog.");
        }
    },
    editBlog: async (req, res) => {
        try {
            const { id } = req.params;

            const token = req.cookies.token;

            if (!token) {
                return res.redirect('/login');
            }

            const decodedUserId = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET).id;

            const [userResult] = await db.query('SELECT id, name, avatar FROM users WHERE id = ?', [decodedUserId]);
            
            if (userResult.length === 0) {
                return res.redirect('/login');
            }

            const [ result ] = await db.query('SELECT * FROM blogs WHERE id = ? AND userId = ?', [id, decodedUserId]);

            if (result.length === 0) {
                return res.status(404).send('Blog not found');
            }

            userResult.forEach(user => {
                user.avatar = user.avatar ? `/uploads/avatars/${user.avatar}` : '/uploads/avatars/person.png';
            })

            result.forEach(blog => {
                blog.coverImage = blog.coverImage ? `/uploads/${blog.coverImage}` : null;
            })

            res.render('editBlog', { blog: result[0], user: userResult[0] });
        } catch (error) {
            console.log(error);
            res.status(500).send("An error occurred while editing the blog.");
        }
    },
    updateBlog: async (req, res) => {
        try {
            const { id } = req.params;

            const { title, content } = req.body;
            const coverImage = req.file ? req.file.filename : null; // Access the file name of the uploaded image

            const token = req.cookies.token;

            if (!token) {
                return res.redirect('/login');
            }

            const decodedUserId = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET).id;

            const [ result ] = await db.query('UPDATE blogs SET title = ?, content = ?, coverImage = ? WHERE id = ? AND userId = ?', [title, content, coverImage, id, decodedUserId]);

            if (result.affectedRows === 0) {
                return res.status(404).send('Blog not found');
            }

            res.redirect('/blog/' + id);
        } catch (error) {
            console.log(error);
            res.status(500).send("An error occurred while updating the blog.");
        }
    },
    deleteBlog: async (req, res) => {
        try {
            const { id } = req.params;

            const token = req.cookies.token;

            if (!token) {
                return res.redirect('/login');
            }
            const decodedUserId = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET).id;

            const [ result ] = await db.query('DELETE FROM blogs WHERE id = ? AND userId = ?', [id, decodedUserId]);

            if (result.affectedRows === 0) {
                return res.status(404).send('Blog not found');
            }

            res.redirect('/profile');

        } catch (error) {
            console.log(error);
            res.status(500).send("An error occurred while deleting the blog.");
        }
    }
}

module.exports = blogController;