document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoList = document.getElementById('todo-list');
    const input = `<input type="checkbox" class="todos">`

    // Fetch and display to-dos
    const fetchTodos = async () => {
        const response = await fetch('http://localhost:3000/api/todos');
        const todos = await response.json();
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const label = document.createElement('label');
            if (input.checked) {
                todo.completed = true
            } else{
                todo.completed = false
            }
            label.innerHTML = ` ${input} ${todo.title}: ${todo.description} (${todo.completed ? 'Completed' : 'Pending'}) <br>`;
            
            todoList.appendChild(label);
        });
    };

    // Add a new to-do
    todoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;

        await fetch('http://localhost:3000/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        });

        fetchTodos();
    });

    fetchTodos();
});
