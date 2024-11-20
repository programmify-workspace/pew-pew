const db = require('../config/db');
const jwt = require('jsonwebtoken');

const commentController = {
  createComment: async (req, res) => {
    const { content, blogId } = req.body;

    try {
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      console.log(token);
      console.log(req.user);
      const decodedUserId = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET).id;
  
      console.log(decodedUserId);
  
      const comment = await db.query('INSERT INTO comments (blogId, userId, content) VALUES (?,?,?)', [blogId, decodedUserId, content]);

      res.status(201).json(comment[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong while   getting the comments' });
    }
  },
  getCommentsByBlogId: async (req, res) => {
    const { blogId } = req.params;  
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const offset = (page - 1) * limit;

    try {

    // Get total count of comments
    const [totalCount] = await db.query(
      'SELECT COUNT(*) as count FROM comments WHERE blogId = ?',
      [blogId]
    );
    
    // First get all comments
      const [comments] = await db.query(`
        SELECT 
          comments.*,
          users.name,
          users.avatar 
        FROM comments 
        JOIN users ON comments.userId = users.id 
        WHERE blogId = ? 
        ORDER BY comments.created_at DESC
        LIMIT ? OFFSET ?`, 
        [blogId, limit, offset]
      );
  

      if (comments.length === 0) {
        return res.status(404).json({ 
          error: 'No comments yet', 
          status: '404' 
        });
      }

      // Get all replies for these comments in a single query
      const commentIds = comments.map(comment => comment.id);
      const [replies] = await db.query(`
        SELECT 
          replies.*,
          users.name,
          users.avatar
        FROM replies 
        JOIN users ON replies.userId = users.id 
        WHERE replies.commentId IN (?)
        ORDER BY replies.created_at ASC`,
        [commentIds]
      );

      // Format and attach replies to their parent comments
      const formattedComments = comments.map(comment => ({
        ...comment,
        avatar: comment.avatar ? `/uploads/avatars/${comment.avatar}` : '/uploads/avatars/person.png',
        replies: replies
          .filter(reply => reply.commentId === comment.id)
          .map(reply => ({
            ...reply,
            avatar: reply.avatar ? `/uploads/avatars/${reply.avatar}` : '/uploads/avatars/person.png'
          }))
      }));

          // Calculate pagination info
      const totalPages = Math.ceil(totalCount[0].count / limit);
    
      res.status(200).json({
        comments: formattedComments,
        pagination: {
          currentPage: page,
          totalPages,
          totalComments: totalCount[0].count,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        error: 'Something went wrong while fetching comments',
        details: error.message 
      });
  }
  },
  deleteComment: async (req, res) => {
    const { commentId } = req.params;
    const token = req.cookies.token;
    
    try {
      const decodedUserId = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET).id;
      
      // First check if the user owns this comment
      const [comment] = await db.query('SELECT userId FROM comments WHERE id = ?', [commentId]);
      
      if (comment.length === 0) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      if (comment[0].userId !== decodedUserId) {
        return res.status(403).json({ error: 'Not authorized to delete this comment' });
      }

      await db.query('DELETE FROM comments WHERE id = ?', [commentId]);
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong while deleting the comment' });
    }
  },
  createReply: async (req, res) => {
    try {
        const { content, parentId, blogId } = req.body;

      if (!parentId) {
          return res.status(404).json({ error: 'comment not found' });
      }

        const token = req.cookies.token;
        
        const decodedUserId = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET).id;

        const [reply] = await db.query(
          'INSERT INTO replies (content, userId, blogId, commentId, created_at) VALUES (?, ?, ?, ?, ?)', 
          [content, decodedUserId, blogId, parentId, new Date()]
        );

        console.log(reply);

        const [newReply] = await db.query(
          'SELECT * FROM replies WHERE id = ?', 
          [reply.insertId]
        );

      const avatar = `/uploads/avatars/${newReply[0].avatar}`;

      // Adding the avatar to the reply object
      newReply[0].avatar = avatar;

      res.json({
          id: newReply[0].id,
          content: newReply[0].content,
          created_at: newReply[0].created_at,
          avatar: newReply[0].avatar,
          // Include any other necessary fields
      });

    } catch (error) {
        console.error('Error creating reply:', error);
        res.status(500).json({ error: 'Something went wrong while creating the reply' });
    }
  },
  getRepliesByCommentId: async (req, res) => {
    const { commentId } = req.params;

    try {
      const [replies] = await db.query(`
        SELECT 
          replies.*,
          users.name,
          users.avatar
        FROM replies 
        JOIN users ON replies.userId = users.id 
        WHERE replies.commentId = ?
        ORDER BY replies.created_at ASC`,
        [commentId]
      );

      if (replies.length === 0) {
        return res.status(404).json({ 
          error: 'No replies found', 
          status: '404' 
        });
      }

      // Format replies with proper avatar paths
      const formattedReplies = replies.map(reply => ({
        ...reply,
        avatar: reply.avatar ? `/uploads/avatars/${reply.avatar}` : '/uploads/avatars/person.png'
      }));

      res.status(200).json(formattedReplies);
    } catch (error) {
      console.error('Error fetching replies:', error);
      res.status(500).json({ 
        error: 'Something went wrong while fetching replies',
        details: error.message 
      });
    }
  },
  getRepliesByCommentId: async (req, res) => {
    const { commentId } = req.params;

    try {
      const [replies] = await db.query(`
        SELECT 
          replies.*,
          users.name,
          users.avatar
        FROM replies 
        JOIN users ON replies.userId = users.id 
        WHERE replies.commentId = ?
        ORDER BY replies.created_at ASC`,
        [commentId]
      );

      if (replies.length === 0) {
        return res.status(404).json({ 
          error: 'No replies found', 
          status: '404' 
        });
      }

      // Format replies with proper avatar paths
      const formattedReplies = replies.map(reply => ({
        ...reply,
        avatar: reply.avatar ? `/uploads/avatars/${reply.avatar}` : '/uploads/avatars/person.png'
      }));

      res.status(200).json(formattedReplies);
    } catch (error) {
      console.error('Error fetching replies:', error);
      res.status(500).json({ 
        error: 'Something went wrong while fetching replies',
        details: error.message 
      });
    }
  },
  getRepliesByCommentId: async (req, res) => {
    const { commentId } = req.params;

    try {
      const [replies] = await db.query(`
        SELECT 
          replies.*,
          users.name,
          users.avatar
        FROM replies 
        JOIN users ON replies.userId = users.id 
        WHERE replies.commentId = ?
        ORDER BY replies.created_at ASC`,
        [commentId]
      );

      if (replies.length === 0) {
        return res.status(404).json({ 
          error: 'No replies found', 
          status: '404' 
        });
      }

      // Format replies with proper avatar paths
      const formattedReplies = replies.map(reply => ({
        ...reply,
        avatar: reply.avatar ? `/uploads/avatars/${reply.avatar}` : '/uploads/avatars/person.png'
      }));

      res.status(200).json(formattedReplies);
    } catch (error) {
      console.error('Error fetching replies:', error);
      res.status(500).json({ 
        error: 'Something went wrong while fetching replies',
        details: error.message 
      });
    }
  },
  deleteReply: async (req, res) => {
    const { replyId } = req.params;
    const token = req.cookies.token;
    
    try {
      const decodedUserId = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET).id;
      
      // First check if the user owns this reply
      const [reply] = await db.query('SELECT userId FROM replies WHERE id = ?', [replyId]);
      
      if (reply.length === 0) {
        return res.status(404).json({ error: 'Reply not found' });
      }

      if (reply[0].userId !== decodedUserId) {
        return res.status(403).json({ error: 'Not authorized to delete this reply' });
      }

      await db.query('DELETE FROM replies WHERE id = ?', [replyId]);
      res.json({ message: 'Reply deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong while deleting the reply' });
    }
  }
};

module.exports = commentController;