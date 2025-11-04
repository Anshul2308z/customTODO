const API_URL = "http://localhost:5000/api";
const token = localStorage.getItem("token");

// Redirect to login if not logged in
if (!token) {
  window.location.href = "login.html";
}

const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const logoutBtn = document.getElementById("logout-btn");

async function fetchTasks() {
  const res = await fetch(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const tasks = await res.json();
  renderTasks(tasks);
}

addBtn.addEventListener("click", async () => {
  const text = taskInput.value.trim();
  if (!text) return;
  await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });
  taskInput.value = "";
  fetchTasks();
});

async function deleteTask(id) {
  await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  fetchTasks();
}

async function toggleTask(id) {
  await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  fetchTasks();
}

function renderTasks(tasks) {
  taskList.innerHTML = "";
  if (tasks.length === 0) {
    taskList.innerHTML = "<p>No tasks yet</p>";
    return;
  }
  tasks.forEach((t) => {
    const li = document.createElement("li");
    li.className = t.completed ? "completed" : "";
    li.innerHTML = `
      <span onclick="toggleTask('${t._id}')">${t.text}</span>
      <div class="btn-group">
        <button class="toggle-btn" onclick="toggleTask('${t._id}')">
          ${t.completed ? "Undo" : "Complete"}
        </button>
        <button class="delete-btn" onclick="deleteTask('${t._id}')">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});

fetchTasks();
