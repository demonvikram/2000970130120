const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const User = require('../models/userModel');

async function registerCompany(req, res) {
  try {
    const { companyName, ownerName, ownerEmail, rollNo, accessCode } = req.body;

    if (accessCode !== 'zxcAbi') {
      return res.status(401).json({ error: 'Invalid access code' });
    }

    const existingUser = await User.findOne({ ownerEmail });
    if (existingUser) {
      return res.status(400).json({ error: 'User already registered' });
    }


    const hashedPassword = await bcrypt.hash(rollNo, 10);

    const newUser = new User({
      companyName,
      ownerName,
      ownerEmail,
      rollNo,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: 'Company registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
}

async function login(req, res) {
  try {
    const { ownerEmail, rollNo } = req.body;

    const user = await User.findOne({ ownerEmail });

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const passwordMatch = await bcrypt.compare(rollNo, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const token = jwt.sign({ userId: user._id }, config.secretKey, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
}

module.exports = {
  registerCompany,
  login,
};
