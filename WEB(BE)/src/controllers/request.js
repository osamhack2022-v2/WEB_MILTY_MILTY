const Request = require('../models/request.model');
const Schedule = require('../models/duty_schedule.model');
const Timeslot = require('../models/timeslot.model');
const Duty = require('../models/duty.model');
const Users = require('../models/users.model');

/*
request_type
  0 - 건의사항 
  1 - 근무변경

request_status
  0 - 처리불가
  1 - 처리중
  2 - 처리완료
*/

// 건의사항 및 근무변경 추가(구현완료)
exports.user_set_duty_request = async (req, res) => {
  const {
    request_type,
    duty_schedule_pid,
    request_reason,
    request_date,
    request_usr,
    request_change_usr,
  } = req.body;

  console.log(
    '건의사항 및 근무변경 연결 성공!',
    '건의사항 = 0 / 근무변경 = 1 :',
    request_type,
    '바꿀 근무 날짜 :',
    duty_schedule_pid,
    '건의 내용 / 변경 사유 :',
    request_reason,
    '건의 날짜 / 변경 :',
    request_date,
    '건의 글쓴이 / 근무 변경자 PID :',
    request_usr,
    '근무 피변경자 PID : ',
    request_change_usr,
  );

  const now = new Date();
  const user_division_code = await Users.findOne({
    attributes: ['usr_division_code'],
    where: { usr_pid: request_usr },
  });
  console.log('부대코드 :', user_division_code['usr_division_code']);

  // 건의사항
  if (request_type == 0) {
    const user = await Users.findOne({
      where: { usr_pid: request_usr },
    });

    Request.create({
      request_type: 0,
      request_reason,
      request_date: now,
      request_division_code: user.usr_division_code,
      request_usr,
      request_change_usr: null, // 근무 변경 인원이 없기때문에 기본값 null으로 설정
      request_status: 1,
      request_division_code: user_division_code['usr_division_code'],
    })
      .then(() => {
        res.json({ result: 'success' });
      })
      .catch(err => {
        console.log(err);
        res.status(200).json({
          result: 'fail',
        });
      });
  }
  // 근무변경
  else if (request_type == 1) {
    Request.create({
      request_type,
      duty_schedule_pid,
      request_reason,
      request_date,
      request_usr,
      request_change_usr,
      request_status: 1,
      request_division_code: user_division_code['usr_division_code'],
    })
      .then(() => {
        res.status(200).json({
          result: 'success',
        });
      })
      .catch(err => {
        console.log(err);
        res.status(200).json({
          result: 'fail',
        });
      });
  } else {
    console.log('request_type 값 오류');
    res.status(200).json({
      result: 'fail',
    });
  }
};

// 관리자 근무 변경 요청 승인/거부(근무 변경 로직 구현 필요)
exports.admin_set_duty_request = async (req, res) => {
  const { pid, status } = req.body;
  try {
    await Request.update(
      {
        request_status: status,
      },
      {
        where: { request_pid: pid },
      },
    );
    res.status(200).json({
      result: 'success',
    });
  } catch (err) {
    console.warn(err);
  }
};

// 유저 근무 요청사항 조회(구현완료)
exports.admin_get_duty_request = async (req, res) => {
  const { division_code } = req.body;

  try {
    const requests = await Request.findAll({
      where: { request_division_code: division_code, request_type: 1 },
    });

    const data = await Promise.all(
      requests.map(
        async ({
          request_pid,
          request_reason,
          request_usr,
          request_change_usr,
          request_status,
          duty_schedule_pid,
        }) => {
          const schedule = await Schedule.findOne({
            where: { duty_schedule_pid: duty_schedule_pid },
          });

          const timeslot = await Timeslot.findOne({
            where: { timeslot_pid: schedule.timeslot_pid },
          });

          const duty = await Duty.findOne({
            attributes: ['duty_name'],
            where: { duty_pid: timeslot.duty_pid },
          });

          const before = await Users.findOne({
            attributes: ['usr_name', 'usr_class'],
            where: { usr_pid: request_usr },
          });
          const after = await Users.findOne({
            attributes: ['usr_name', 'usr_class'],
            where: { usr_pid: request_change_usr },
          });

          return {
            pid: request_pid,
            reason: request_reason,
            before_class: before.usr_class,
            before_name: before.usr_name,
            after_class: after.usr_class,
            after_name: after.usr_name,
            duty_name: duty.duty_name,
            start_time: `${schedule.duty_schedule_date} ${timeslot.timeslot_start}`,
            end_time: `${schedule.duty_schedule_date} ${timeslot.timeslot_end}`,
            status: request_status,
          };
        },
      ),
    );

    console.log(data);

    res.status(200).json({
      result: 'success',
      request: data,
    });
  } catch (err) {
    console.warn(err);
    res.status(200).json({
      result: 'fail',
    });
  }
};
