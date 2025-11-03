// selecting elements
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Loading tasks from localStorage 
let tasks = JSON.parse(localStorage.getItem('tasks')) || []; 
renderTasks(); 

// Add task 
addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = { id: Date.now(), taskText, completed: false };
        tasks.push(task);
        saveAndRender();
        taskInput.value = '';
    }
});

// Delete task 
function deleteTask(id){
    tasks = tasks.filter((t) => t.id !== id);
    saveAndRender();
};

// Toggle complete 
function toggleTask(id){
    tasks = tasks.map((t)=> t.id === id ? {...t, completed: !t.completed} : t);
    saveAndRender();
};

// Save to local storage 
function saveAndRender(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
};

// Render tasks to UI 
function renderTasks() {
    taskList.innerHTML = '';
      if (tasks.length === 0) {
    taskList.innerHTML = "<p style='text-align:center;color:#888;'>No tasks yet</p>";
    return;
  }
  
    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span onclick="toggleTask(${task.id})">${task.taskText}</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}
