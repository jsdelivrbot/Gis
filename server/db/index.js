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

function getTodoById(id) {
  const todos = getAllTodos();
  for(let i=0;i<todos.length;i++) {
    const todo = todos[i];
    if(todo.id === id) {
      todo.index = i;
      return todo;
    }
  }
  return null;
}

function removeTodoById(id) {
  const {index} = getTodoById(id);
  db.delete((`/todos[${index}]`);
}

module.exports = {
  saveTodo,
  getAllTodos,
  removeTodoById
};