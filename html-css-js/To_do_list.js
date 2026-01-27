<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>To-Do List</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f4f4;
      display: flex;
      justify-content: center;
      margin-top: 50px;
    }

    .app {
      background: white;
      padding: 20px;
      width: 300px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }

    input {
      width: 70%;
      padding: 5px;
    }

    button {
      padding: 6px 10px;
      cursor: pointer;
    }

    ul {
      list-style: none;
      padding: 0;
      margin-top: 15px;
    }

    li {
      display: flex;
      justify-content: space-between;
      padding: 6px;
      border-bottom: 1px solid #ddd;
      cursor: pointer;
    }

    li.completed {
      text-decoration: line-through;
      color: gray;
    }

    li button {
      background: none;
      border: none;
      color: red;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="app">
    <h3>To-Do List</h3>

    <input id="todoInput" placeholder="New task" />
    <button id="addBtn">Add</button>

    <ul id="todoList"></ul>
  </div>

  <script>
    // Load todos from localStorage or start empty
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    function saveTodos() {
      localStorage.setItem("todos", JSON.stringify(todos));
    }

    function renderTodos() {
      const list = document.getElementById("todoList");
      list.innerHTML = "";

      todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.textContent = todo.text;

        if (todo.completed) {
          li.classList.add("completed");
        }

        // Toggle completed
        li.onclick = () => toggleTodo(index);

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.onclick = (e) => {
          e.stopPropagation(); // prevent toggle
          deleteTodo(index);
        };

        li.appendChild(deleteBtn);
        list.appendChild(li);
      });
    }

    function addTodo() {
      const input = document.getElementById("todoInput");
      if (input.value === "") return;

      todos.push({ text: input.value, completed: false });
      input.value = "";

      saveTodos();
      renderTodos();
    }

    function toggleTodo(index) {
      todos[index].completed = !todos[index].completed;
      saveTodos();
      renderTodos();
    }

    function deleteTodo(index) {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    }

    document.getElementById("addBtn").onclick = addTodo;

    // Initial render
    renderTodos();
  </script>
</body>
</html>
