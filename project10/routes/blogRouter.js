const multer = require('multer');
const express = require('express');
const methodOverride = require('method-override');
const router = express.Router();
const { protect } = require('../middleware/auth');
const upload = require('../config/multerConfig');
const blogController = require('../controllers/blogController');

// debug middleware
router.use((req, res, next) => {
   console.log('Method:', req.method);
   console.log('Path:', req.path);
   console.log('Full URL:', req.originalUrl);
   next();
});

router.use(methodOverride('_method'));

router.get('/', blogController.getIndex);

router.get('/create-post', protect, blogController.getCreateBlog)

router.post('/create-post', protect, upload.single('coverImage'), blogController.createBlog);
  
router.get('/blog/:id', blogController.getBlogById);

router.get('/blog/:id/edit', protect, blogController.editBlog);

router.put('/blog/:id/edit', protect, upload.single('coverImage'), (req, res, next) => {
   console.log('Delete route hit!');
   console.log('ID:', req.params.id);
   next();
}, blogController.updateBlog);

router.delete('/blog/:id/delete', protect, blogController.deleteBlog);

router.get('/all-posts', protect, blogController.getAllBlogs);

module.exports = router;