const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(express.json());

// Nodemailer transporter (haqiqiy Gmail + App Password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // .env faylda haqiqiy Gmail
    pass: process.env.EMAIL_PASS, // 16 xonali App Password
  },
});

// 6 xonali kod yaratish
const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// POST endpoint
app.post('/send_email', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }

  try {
    const code = generateCode();

    // Email yuborish
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Verification Code',
      text: `Your 6-digit verification code is: ${code}`,
    });

    console.log(`Yuborilgan kod ${email}:`, code);

    res.json({
      success: true,
      message: 'Email sent successfully!',
      code: code,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Email yuborishda xato' });
  }
});

app.listen(port, () => {
  console.log(`Server 2 is running on http://localhost:${port}`);
});