const Duty_Schedule = require('../models/duty_schedule.model');
const Duty = require('../models/duty.model');

exports.get_check_count = async function (req, res) {
  const { user_pid, user_division_code } = req.body;
  const dutyList = Duty.findAll();

  const user_duty_schedule = await Duty_Schedule.findAll({
    where: {
      usr_pid: user_pid,
    },
  });
  // 원하시는 요청은 아닐텐데 user pid를 통해 전체 근무 카운트 가져오는 기능으로 구현했습니다.
  // 현재 각 duty별로 카운트를 세려면 지금 구조상으로 db 탐색 작업이 꽤나 복잡합니다.
  // 1. duty_schedule에서 usr_pid 기준으로 timeslot_pid 내용 가져오기
  // 2. 해당되는 timeslot_pid의 있는 duty_pid 가져오기
  // 3. duty_pid를 참고하여 duty_name 가져오기

  console.log(user_duty_schedule);
  return res.status(200).json({
    duty_name: user_division_code,
    duty_count: user_duty_schedule.length,
  });
};
