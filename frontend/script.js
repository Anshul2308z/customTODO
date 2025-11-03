// Selecting elements
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Connecting Backend API 
const API_URL = "http://localhost:5000/api/tasks";
let tasks = [];

// Fetch tasks on load
fetchTasks();

// Fetch all tasks
async function fetchTasks() {
  try {
    const res = await fetch(API_URL);
    tasks = await res.json();
    renderTasks();
  } catch (err) {
    console.error("Error fetching tasks:", err);
  }
}

// Add a new task
addBtn.addEventListener("click", async () => {
  const text = taskInput.value.trim();
  if (text === "") return;

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    taskInput.value = "";
    fetchTasks(); // refresh list
  } catch (err) {
    console.error("Error adding task:", err);
  }
});

// Delete a task
async function deleteTask(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
  } catch (err) {
    console.error("Error deleting task:", err);
  }
}

// Toggle complete
async function toggleTask(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "PUT" });
    fetchTasks();
  } catch (err) {
    console.error("Error toggling task:", err);
  }
}

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
    <span>${task.text}</span>
    <div class="btn-group">
      <button class="toggle-btn" onclick="toggleTask('${task._id}')">
        ${task.completed ? 'Undo' : 'Complete'}
      </button>
      <button class="delete-btn" onclick="deleteTask('${task._id}')">
        Delete
      </button>
    </div>
  `;

  taskList.appendChild(li);
});

}
