import Task from "../../../../DB/Models/task.js";

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await Task.create({
      title,
      description,
      userId: req.user.userId,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Tasks for Logged-In User
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.userId } });
    res.json({ Tasks: tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const taskId = req.query.taskId;
    const { title, description, completed } = req.body;
    const task = await Task.findOne({
      where: { id: taskId, userId: req.user.userId },
    });
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.completed = completed ?? task.completed;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const taskId = req.query.taskId;
    const task = await Task.findOne({
      where: { id: taskId, userId: req.user.userId },
    });
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.destroy();
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createTask, getTasks, updateTask, deleteTask };
