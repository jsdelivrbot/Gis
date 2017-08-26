const JsonDb = require("node-json-db");
const uniqid = require("uniqid");

const db = new JsonDb("./store.db", true, false);

function saveTodo(todo) {
  todo.id = uniqid();
  db.push("/todos[]", todo);
  return todo;
}

function getAllTodos() {
  return db.getData("/todos");
}

module.exports = {
  saveTodo,
  getAllTodos
};