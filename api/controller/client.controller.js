const User = require('../models/User');

exports.getClientData = async (req, res) => {
  try {
    const userid = req.params.userid;
    const user = await User.findOne({ user_id: userid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    let userData = [
      {
        id: user._id,
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        balance: user.balance,
        profit: user.profit,
        reffer: user.refferal,
      },
    ];

    const refferedUsers = await User.find({ refferal: user.user_id });
    if (refferedUsers.length > 0) {
      refferedUsers.forEach((refferedUser) => {
        userData.push({
          user_id: refferedUser.user_id,
          username: refferedUser.username,
          email: refferedUser.email,
          plan: 'regular',
        });
      });
    } else {
      userData.push({ result: 'No Reffer' });
    }

    res.json(userData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
