const express = require('express');
const router = express.Router();
const todos = require('../controllers/todoController');

// CREATE
router.post('/', todos.create);

// READ
router.get('/', todos.findAll);

// UPDATE
router.put('/:id', todos.update);

// DELETE
router.delete('/:id', todos.delete);

module.exports = router;
