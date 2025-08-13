const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

const sendEmail = async ({ to, subject, html }) => {
  const info = await transporter.sendMail({ from: process.env.FROM_EMAIL, to, subject, html });
  return info;
};

module.exports = sendEmail;
