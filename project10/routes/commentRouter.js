const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/comments', commentController.createComment);
router.get('/blog/:blogId/comments', commentController.getCommentsByBlogId);
router.delete('/comments/:commentId', commentController.deleteComment);

router.post('/comments/reply', commentController.createReply);
router.get('/comments/:commentId/replies', commentController.getRepliesByCommentId);

module.exports = router;