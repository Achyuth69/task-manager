// backend/utils/emailService.js
const nodemailer = require('nodemailer');

let testAccount;
let cachedTransporter = null;

async function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  // Create ethereal test account only once (dev)
  testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  cachedTransporter = transporter;
  return transporter;
}

exports.sendEmail = async (to, subject, html) => {
  const transporter = await getTransporter();
  const info = await transporter.sendMail({
    from: `"Task Manager" <no-reply@taskmanager.local>`,
    to,
    subject,
    html
  });

  console.log('📧 Preview URL:', nodemailer.getTestMessageUrl(info)); // open this URL to view the email in browser
  return nodemailer.getTestMessageUrl(info);
};
