const Task = require("../models/Task");

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority } = req.query;

    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const totalTasks = await Task.countDocuments(query);
    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      tasks,
      totalPages: Math.ceil(totalTasks / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create task
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const newTask = new Task({
      title,
      description,
      priority: priority || "Medium",
      status: status || "Pending",
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) return res.status(404).json({ message: "Task not found" });
    res.json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Server error" });
  }
};
