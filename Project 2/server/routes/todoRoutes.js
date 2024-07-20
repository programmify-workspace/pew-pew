const express = require('express');
const router = express.Router();
const todos = require('../controllers/todoController');

// Create a new Todo
router.post('/', todos.create);

// Retrieve all Todos
router.get('/', todos.findAll);

// Update a Todo with id
router.put('/:id', todos.update);

// Delete a Todo with id
router.delete('/:id', todos.delete);

module.exports = router;
