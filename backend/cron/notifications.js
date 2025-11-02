// backend/cron/notifications.js
const cron = require('node-cron');
const Task = require('../models/Task');
const { sendEmail } = require('../utils/sendEmail');

// Runs every day at 9 AM
cron.schedule('0 9 * * *', async () => {
  console.log('⏰ Running daily due-date notification job...');

  try {
    // Find tasks due in the next 24 hours
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    const dueTasks = await Task.find({
      dueDate: { $gte: now, $lte: tomorrow },
      completed: false,
    }).populate('user', 'email name');

    for (const task of dueTasks) {
      if (task.user?.email) {
        await sendEmail(
          task.user.email,
          `Task Due Soon: ${task.title}`,
          `<p>Hey ${task.user.name || 'User'},</p>
           <p>Your task "<b>${task.title}</b>" is due on <b>${task.dueDate.toDateString()}</b>.</p>
           <p>Don't forget to complete it!</p>`
        );
      }
    }

    console.log(`✅ Sent ${dueTasks.length} due-date reminders.`);
  } catch (err) {
    console.error('❌ Cron Job Error:', err);
  }
});
