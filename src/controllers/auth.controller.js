const User = require('../models/model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    console.log('➡️ Register API hit');
    console.log('📦 Request body:', req.body);

    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password
    });

    console.log('✅ User saved:', user._id);

    res.status(201).json({
      message: 'User registered successfully',
      id: user._id
    });
  } catch (error) {
    // 🔴 THIS IS THE MOST IMPORTANT PART
    console.error('❌ REGISTER ERROR:', error);

    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    // 2️⃣ Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    // 4️⃣ Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.status(200).json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};