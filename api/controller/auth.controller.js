const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { user: { id: user.id } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.signup = async (req, res) => {
  const { username, email, password, referral, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    const user = new User({
      user_id: `user_${new Date().getTime()}`,
      username,
      email,
      balance: 2000,
      profit: 0,
      refferal: referral,
      password: await bcrypt.hash(password, 10),
      payment: razorpay_payment_id,
    });

    await user.save();

    if (referral) {
      const referrer = await User.findOne({ user_id: referral });
      if (referrer) {
        referrer.balance += 1500; // example bonus
        await referrer.save();
      }
    }

    res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
