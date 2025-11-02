const express = require("express");
const router = express.Router();
const { getTasks } = require("../controllers/taskController");
const { createTask, updateTask, deleteTask } = require("../controllers/taskController");

// Pagination-enabled route
router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
