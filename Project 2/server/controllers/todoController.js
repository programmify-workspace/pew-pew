const Todo = require('../models/todoModel');

// CREATE CONTROLLER
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    return res.status(400).send({
      message: "Title can not be empty!"
    });
  }

  // CREATE TODO
  const todo = new Todo({
    title: req.body.title,
    completed: req.body.completed || false
  });

  // SAVE TODO TO DB
  Todo.create(todo, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Todo."
      });
    else res.send(data);
  });
};

// READ ALL TODO
exports.findAll = (req, res) => {
  Todo.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving todos."
      });
    else res.send(data);
  });
};

// UPDATE TODO
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

// DELETE TODO
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
