const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

let todos = [
  { id: 1, text: "Buy groceries", completed: false },
  { id: 2, text: "Read a book", completed: true },
  { id: 3, text: "Go for a run", completed: false },
];

// Get all todos
app.get("/api/todos", (req, res) => {
  res.json({ todos });
});

// Get a specific todo
app.get("/api/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === todoId);

  if (todo) {
    res.json({ todo });
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

// Create a new todo
app.post("/api/todos", (req, res) => {
  const { text, completed } = req.body;
  const newTodo = {
    id: todos.length + 1,
    text,
    completed: completed || false,
  };

  todos.push(newTodo);
  res.status(201).json({ todo: newTodo });
});

// Update a todo
app.put("/api/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex !== -1) {
    const updatedTodo = { ...todos[todoIndex], ...req.body };
    todos[todoIndex] = updatedTodo;
    res.json({ todo: updatedTodo });
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

// Delete a todo
app.delete("/api/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== todoId);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
