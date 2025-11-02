const cron = require('node-cron');
const Task = require('../models/Task');
const { sendEmail } = require('../utils/sendEmail');

cron.schedule('0 9 * * *', async () => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const tasksDue = await Task.find({ dueDate: { $lte: tomorrow }, status: 'pending' });

  for (const task of tasksDue) {
    await sendEmail(
      process.env.SMTP_USER,
      `Task Reminder: ${task.title}`,
      `<p>Your task "${task.title}" is due soon (${task.dueDate.toDateString()}).</p>`
    );
  }
  console.log('📧 Sent due-date reminders');
});
