const cron = require('node-cron');
const Task = require('../models/Task');
const { sendEmail } = require('../utils/sendEmail');
const User = require('../models/User');

cron.schedule('0 * * * *', async () => { // every hour
  const now = new Date();
  const upcoming = new Date(now.getTime() + 60 * 60 * 1000);
  const tasks = await Task.find({ dueDate: { $lte: upcoming, $gte: now } }).populate('user');

  for (const task of tasks) {
    if (task.user?.email)
      await sendEmail(task.user.email, "Task Due Soon", `<p>Your task "${task.title}" is due soon!</p>`);
  }
});
