import express from "express" ;
import Task from  "../models/Tasks.js" ;
import auth from "../middleware/authMiddleware.js" ;

const router = express.Router() ;

// GET all tasks
router.get("/", auth,  async (req, res)=>{
  try { 
    const tasks = await Task.find({user: req.user.id}).sort({ createdAt: -1 }) ;
    res.json(tasks) ;
  }catch (error) { 
    res.status(500).json({ message: "Server Error" }) ;
  };
});

// POST new task
router.post("/", auth, async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: "Task text required" });

  try { 
    const newTask = new Task({ text: text, user: req.user.id });
    await newTask.save();
    res.status(201).json(newTask);
  }catch(err){ 
    console.error(err) ;
    res.status(500).json({ message: "Server Error" }) ;
  }
});



// Toggle completion (only if owned by user)
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a task (only if owned by user)
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router ;