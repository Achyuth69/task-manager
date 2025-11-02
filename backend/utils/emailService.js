const nodemailer = require('nodemailer');

exports.sendTestEmail = async (to, subject, html) => {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: { user: testAccount.user, pass: testAccount.pass },
  });

  const info = await transporter.sendMail({
    from: `"Task Manager" <no-reply@taskmanager.local>`,
    to,
    subject,
    html,
  });

  console.log("📧 Preview URL:", nodemailer.getTestMessageUrl(info));
  return nodemailer.getTestMessageUrl(info);
};
