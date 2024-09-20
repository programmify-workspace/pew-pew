const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a new to-do item
router.post('/', (req, res) => {
    const { title, description } = req.body;
    db.query('INSERT INTO todos (title, description) VALUES (?, ?)', [title, description], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId, title, description, completed: false });
    });
});

// Read all to-do items
router.get('/', (req, res) => {
    db.query('SELECT * FROM todos', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Update a to-do item
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    db.query('UPDATE todos SET title = ?, description = ?, completed = ? WHERE id = ?', [title, description, completed, id], (err) => {
        if (err) throw err;
        res.json({ message: 'To-do item updated' });
    });
});

// Delete a to-do item
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM todos WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'To-do item deleted' });
    });
});

module.exports = router;
