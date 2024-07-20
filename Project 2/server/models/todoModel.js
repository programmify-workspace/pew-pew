const pool = require('../db/database')

// CONSTRUCTOR
const Todo = function(todo) {
  this.title = todo.title;
  this.completed = todo.completed;
};

// CREATE MODEL
Todo.create = async (newTodo, result) => {
  try {
    const [res] = await pool.query("INSERT INTO todos SET ?", newTodo);
    result(null, { id: res.insertId, ...newTodo });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

// READ MODEL
Todo.getAll = async result => {
  try {
    const [res] = await pool.query("SELECT * FROM todos");
    result(null, res);
  } catch (err) {
    console.log("error: ", err);
    result(null, err);
  }
};

// UPDATE MODEL
Todo.updateById = async (id, todo, result) => {
  try {
    const [res] = await pool.query("UPDATE todos SET title = ?, completed = ? WHERE id = ?", [todo.title, todo.completed, id]);
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
    } else {
      result(null, { id: id, ...todo });
    }
  } catch (err) {
    console.log("error: ", err);
    result(null, err);
  }
};

// DELETE MODEL
Todo.remove = async (id, result) => {
  try {
    const [res] = await pool.query("DELETE FROM todos WHERE id = ?", id);
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
    } else {
      result(null, res);
    }
  } catch (err) {
    console.log("error: ", err);
    result(null, err);
  }
};

module.exports = Todo;
