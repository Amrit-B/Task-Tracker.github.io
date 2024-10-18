document.getElementById('add-task-btn').addEventListener('click', addTask);
document.getElementById('task-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('task-list');
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            ${taskText}
            <button onclick="deleteTask(this)">Delete</button>
        `;
        taskItem.addEventListener('click', function () {
            taskItem.classList.toggle('completed');
        });
        taskList.appendChild(taskItem);
        saveTasks();
    }

    taskInput.value = '';
}

function deleteTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(task => {
        tasks.push({ text: task.textContent.replace('Delete', '').trim(), completed: task.classList.contains('completed') });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskList = document.getElementById('task-list');
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        if (task.completed) taskItem.classList.add('completed');
        taskItem.innerHTML = `
            ${task.text}
            <button onclick="deleteTask(this)">Delete</button>
        `;
        taskItem.addEventListener('click', function () {
            taskItem.classList.toggle('completed');
            saveTasks();
        });
        taskList.appendChild(taskItem);
    });
}

loadTasks();
