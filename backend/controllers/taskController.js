const Task = require("../models/Task");

// Get all tasks with pagination & filters
exports.getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority } = req.query;

    // Convert to numbers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Apply filters if provided
    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    // Get total count for pagination
    const totalTasks = await Task.countDocuments(query);

    // Fetch paginated tasks
    const tasks = await Task.find(query)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .sort({ createdAt: -1 }); // newest first

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
