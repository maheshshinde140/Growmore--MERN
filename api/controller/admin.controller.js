const User = require('../models/User');
const Company = require('../models/Company');

exports.getAdminData = async (req, res) => {
  try {
    const cmpbal = await Company.find();
    let bal = 0;
    cmpbal.forEach(cmp => {
      bal += cmp.cmpprofit;
    });

    const userid = req.params.userid;
    const user = await User.findOne({ user_id: userid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    let userData = [
      {
        id: user._id,
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        plan: 'regular',
        balance: user.balance,
        profit: user.profit,
        reffer: user.refferal,
        cmp: bal,
      },
    ];

    const refferedUsers = await User.find({ refferal: user.user_id });
    refferedUsers.forEach((refferedUser) => {
      userData.push({
        user_id: refferedUser.user_id,
        username: refferedUser.username,
        email: refferedUser.email,
        plan: 'regular',
        balance: refferedUser.balance,
        profit: refferedUser.profit,
        reffer: refferedUser.refferal,
      });
    });

    res.json(userData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
