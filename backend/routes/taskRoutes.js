// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskCtrl = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, taskCtrl.getTasks);
router.post('/', protect, taskCtrl.createTask);
router.put('/:id', protect, taskCtrl.updateTask);
router.delete('/:id', protect, taskCtrl.deleteTask);

module.exports = router;
