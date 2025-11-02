const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { sendEmail } = require('../utils/sendEmail'); // works with your workspace email SMTP

// ========================= REGISTER =========================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ message: 'User already exists' });

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    user = new User({ name, email, password, verificationToken });
    await user.save();

    // Send verification email
    const verifyLink = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;
    await sendEmail(
      email,
      'Verify Your Email',
      `<p>Hello ${name},</p>
       <p>Please verify your account by clicking <a href="${verifyLink}">this link</a>.</p>`
    );

    res.status(201).json({
      message: 'Registration successful! Please verify your email.'
    });
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ message: err.message });
  }
};

// ========================= LOGIN =========================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    // Check verification
    if (!user.verified)
      return res.status(403).json({ message: 'Please verify your email first.' });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: err.message });
  }
};

// ========================= EMAIL VERIFICATION =========================
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Find user with token
    const user = await User.findOne({ verificationToken: token });
    if (!user)
      return res.status(400).json({ message: 'Invalid or expired token' });

    // Mark user verified
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (err) {
    console.error('Verify Email Error:', err);
    res.status(500).json({ message: err.message });
  }
};

// ========================= FORGOT PASSWORD =========================
exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    // Create password reset token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send reset email
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    await sendEmail(
      user.email,
      'Password Reset Request',
      `<p>Hello,</p>
       <p>You requested to reset your password. Click <a href="${resetLink}">here</a> to set a new password.</p>
       <p>This link expires in 1 hour.</p>`
    );

    res.json({ message: 'Password reset link sent to your email' });
  } catch (err) {
    console.error('Forgot Password Error:', err);
    res.status(500).json({ message: err.message });
  }
};

// ========================= RESET PASSWORD =========================
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Find user with valid reset token
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: 'Invalid or expired token' });

    // Hash new password and clear reset fields
    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Reset Password Error:', err);
    res.status(500).json({ message: err.message });
  }
};
