import React, { useEffect, useState } from "react";
import "./App.css"; // Import the external CSS file

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    fetch("api/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data.todos))
      .catch((error) => console.error("Error fetching todos:", error));
  };

  const addTodo = () => {
    fetch("api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newTodoText, completed: false }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([...todos, data.todo]);
        setNewTodoText("");
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  const updateTodo = (id, newText) => {
    fetch(`api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newText }),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, text: data.todo.text } : todo
        );
        setTodos(updatedTodos);
      })
      .catch((error) => console.error("Error updating todo:", error));
  };

  const deleteTodo = (id) => {
    fetch(`api/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const updatedTodos = todos.filter((todo) => todo.id !== id);
          setTodos(updatedTodos);
        }
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };
  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text} - {todo.completed ? "Completed" : "Not Completed"}
            <button
              onClick={() =>
                updateTodo(todo.id, prompt("Enter new text", todo.text))
              }
            >
              Update
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
    </div>
  );
}

export default App;
