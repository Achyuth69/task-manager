// backend/server.js
require('./cron/notifyDueTasks');
// Load cron job (for due date notifications)
require('./cron/notifications');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Start cron (notifications)
require('./cron/notifications'); // prints logs; uses Ethereal by default

app.get('/', (req, res) => res.send('🚀 Task Manager API'))

const PORT = process.env.PORT || 6969;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
