# 📝 To-Do List Web App

A simple and clean **To-Do List** web application built using the **MERN stack** (MongoDB, Express, React/Vanilla JS, Node.js).  
This app allows users to **add**, **toggle completion**, and **delete** tasks — demonstrating the fundamentals of full-stack web development.

---

## 🚀 Features

- ➕ **Add Tasks** — Quickly add new tasks to your list  
- ✅ **Toggle Completion** — Mark tasks as complete or undo them  
- ❌ **Delete Tasks** — Remove unwanted tasks  
- 🌐 **Backend API Integration** — Uses Express and MongoDB for persistent storage  
- ⚡ **Responsive UI** — Built with clean and minimal CSS (Dark Mode included)

---

## 🧠 Tech Stack

**Frontend:**  
- HTML, CSS, Vanilla JavaScript (Fetch API for backend communication)

**Backend:**  
- Node.js, Express.js  
- MongoDB & Mongoose (for task persistence)

---

## 📁 Project Structure

<img width="430" height="620" alt="image" src="https://github.com/user-attachments/assets/3a3ea7d8-d7c7-411f-93d0-cc64bc4a4b95" />

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

git clone https://github.com/yourusername/todo-app.git
cd todo-app

###2️⃣ Install dependencies

Navigate into the backend folder and install required packages:

cd backend
npm install express mongoose cors dotenv

3️⃣ Setup environment variables

Create a .env file inside backend/ with:

PORT=5000
MONGO_URI=your_mongodb_connection_string

4️⃣ Start the backend server

npm start

The server will run at http://localhost:5000.
5️⃣ Open the frontend

Simply open frontend/index.html in your browser.


🧩 API Endpoints
Method	Endpoint	Description
GET	/api/tasks	Fetch all tasks
POST	/api/tasks	Create a new task
PUT	/api/tasks/:id	Toggle completion of a task
DELETE	/api/tasks/:id	Delete a task // give this in md format
