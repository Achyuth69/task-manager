const Task = require('../models/Task');

// Create
exports.createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, user: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Read (with filtering + pagination)
exports.getTasks = async (req, res) => {
  try {
    const { status, priority, page = 1, limit = 10 } = req.query;
    const query = { user: req.user.id };

    if (status) query.status = status;
    if (priority) query.priority = priority;

    const tasks = await Task.find(query)
      .sort({ dueDate: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Task.countDocuments(query);
    res.json({ tasks, total, page });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete
exports.deleteTask = async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
