const Todo = require('../models/todoModel');

// Create and Save a new Todo
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    return res.status(400).send({
      message: "Title can not be empty!"
    });
  }

  // Create a Todo
  const todo = new Todo({
    title: req.body.title,
    completed: req.body.completed || false
  });

  // Save Todo in the database
  Todo.create(todo, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Todo."
      });
    else res.send(data);
  });
};

// Retrieve all Todos from the database
exports.findAll = (req, res) => {
  Todo.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving todos."
      });
    else res.send(data);
  });
};

// Update a Todo identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.title) {
    return res.status(400).send({
      message: "Title can not be empty!"
    });
  }

  Todo.updateById(
    req.params.id,
    new Todo(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Todo with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Todo with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Todo with the specified id in the request
exports.delete = (req, res) => {
  Todo.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Todo with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Todo with id " + req.params.id
        });
      }
    } else res.send({ message: `Todo was deleted successfully!` });
  });
};
