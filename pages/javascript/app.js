     // URL untuk mengakses API dari crudcrud.com
      const apiUrl = "https://crudcrud.com/api/7620adeabd5d4bc2aaa2a7749f3a3245/todos";
      
      // Mendapatkan elemen form dan daftar to-do
      const todoForm = document.getElementById("todo-form");
      const todoInput = document.getElementById("todo-input");
      const todoList = document.getElementById("todo-list");
      
      // Mendapatkan daftar to-do dari API
      async function getTodos() {
        const response = await fetch(apiUrl);
        const todos = await response.json();
        return todos;
      }
      
      // Menambahkan to-do ke API
      async function addTodo(todo) {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(todo)
        });
        const newTodo = await response.json();
        return newTodo;
      }
      
      // Menghapus to-do dari API
      async function deleteTodo(id) {
        const response = await fetch(`${apiUrl}/${id}`, {
          method: "DELETE"
        });
        const result = await response.json();
        return result;
      }
      
      // Menampilkan daftar to-do ke dalam elemen ul
      function renderTodos(todos) {
        todoList.innerHTML = "";
        todos.forEach(todo => {
          const li = document.createElement("li");
          li.innerText = todo.title;
          
          const deleteButton = document.createElement("button");
          deleteButton.innerText = "Delete";
          deleteButton.addEventListener("click", async () => {
            await deleteTodo(todo._id);
            const updatedTodos = await getTodos();
            renderTodos(updatedTodos);
          });
          
          li.appendChild(deleteButton);
          todoList.appendChild(li);
        });
      }
      
      // Menambahkan event listener untuk form
      todoForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const todo = {
          title: todoInput.value,
          completed: false
        };
        
        await addTodo(todo);
        todoInput.value = "";
        
        const updatedTodos = await getTodos();
        renderTodos(updatedTodos);
      });
      
      // Menampilkan daftar to-do pertama kali halaman dimuat
      getTodos().then(todos => {
        renderTodos(todos);
      });
