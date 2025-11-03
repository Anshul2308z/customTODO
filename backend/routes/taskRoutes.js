import express from "express" ;
import Task from  "../models/Tasks.js" ;
import auth from "../middleware/authMiddleware.js" ;

const router = express.Router() ;

// GET all tasks
router.get("/", auth,  async (req, res)=>{
    const tasks = await Task.find() ;
    res.json(tasks) ;
});

// POST new task
router.post("/", auth, async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: "Task text required" });

  const newTask = new Task({ text });
  await newTask.save();
  res.status(201).json(newTask);
});


// PUT update (toggle complete)
router.put("/:id", auth, async (req, res) => {

  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Not found" });

  task.completed = !task.completed;
  await task.save();
  res.json(task);
});

router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

export default router;
