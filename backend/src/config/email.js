const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(to, subject, text) {
  const info = await transporter.sendMail({
    from: `"Classroom App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
  console.log("Email sent: %s", info.messageId);
}

module.exports = { sendEmail };
