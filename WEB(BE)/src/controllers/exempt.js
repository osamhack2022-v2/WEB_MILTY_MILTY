const User = require('../models/users.model');
const Exempt = require('../models/exempt.model')

// 열외자 추가
exports.set_user_exempt = async function (req, res) {
  let {
    user_pid,
    exempt_start,
    exempt_end,
    exempt_type,
  } = req.body;

  Exempt.create({
    usr_pid: user_pid,
    exempt_start: exempt_start,
    exempt_end: exempt_end,
    exempt_type: exempt_list
  })
    .then(() => {
      return res.status(200).json({ result: "success" });
    })
};


// 열외자 조회(캘린더에서)
exports.get_user_exempt = async function (req, res) {

  const excluders = await Exempt.findAll({ where: { exempt_pid } });
  const name = User.findOne({ where: { usr_pid: user_pid } });

  for (var i = 0; i < excluders.length; i++) {
    res.status(200).json({
      result: 'success',
      request: {
        exempt_pid: excluders[i].exempt_pid,
        user_name: User[i].name,
        exempt_start: excluders[i].exempt_start,
        exempt_end: excluders[i].exempt_end,
        exempt_type: excluders[i].exempt_type,
      },
    });
  };
}