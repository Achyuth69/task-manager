const Task = require("../models/Task");

// ✅ Get all tasks with pagination & filters
exports.getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const totalTasks = await Task.countDocuments(query);

    const tasks = await Task.find(query)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .sort({ createdAt: -1 });

    const totalPages = Math.ceil(totalTasks / limitNumber);

    res.json({
      tasks,
      totalPages,
      currentPage: pageNumber,
    });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

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

// ✅ Update a task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Server error" });
  }
};
