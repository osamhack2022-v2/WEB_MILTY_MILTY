const request = require('../models/request.model');
/*
`request_pid`	int	NOT NULL,
  `request_list`	varchar2(30)	NULL,
  `request_duty`	date	NULL,
  `request_reason`	varchar2(100)	NULL,
  `request_day`	date	NULL,
  `request_user`	int	NULL,
  `request_changes`	int	NULL
*/

/*
request_list
  0 - 건의사항 
  1 - 근무변경
request_check
  0 - 처리불가
  1 - 처리중
  2 - 처리완료
*/

// 건의사항 및 근무변경 저장 테스트 : 확인중
exports.user_set_request = async function (req, res) {
  const {
    request_type,
    duty_schedule_pid,
    request_reason,
    request_date,
    request_usr,
    request_change_usr
  } = req.body;
  // 건의사항
  if (request_type == 0) {
    request
      .create({
        request_type,
        duty_schedule_pid: 0, // 건의사항으로 기본값 0
        request_reason,
        request_date,
        request_usr,
        request_change_usr: 0, // 근무 변경 인원이 없기때문에 기본값 0으로 설정,=
        request_status: 1,
      })
      .then(() => {
        res.send('건의사항(요청) 완료.');
      })
      .catch(err => {
        throw err;
      });
  }
  // 근무변경
  else if (request_type == 1) {
    request
      .create({
        request_type,
        duty_schedule_pid,
        request_reason,
        request_date,
        request_usr,
        request_change_usr,
        request_status: 1,
      })
      .then(() => {
        res.send('근무변경(요청) 완료.');
      })
      .catch(err => {
        throw err;
      });
  } else {
    console.log('request_list 값 오류');
  }
};

// 유저 건의사항 및 근무 요청사항 주기
exports.user_get_request = async function (req, res) {
  const {
    usr_pid
  } = req.body;
  const requests = await Users.findAll({ where: { request_usr: request_usr } });

  for (var i = 0; i < requests.length; i++) {
    res.status(200).json({
      result: 'success',
      request: {
        request_type: requests[i].request_type,
        duty_schedule_pid: requests[i].duty_schedule_pid,
        request_reason: requests[i].request_reason,
        request_date: requests[i].request_date,
        request_usr: requests[i].request_usr,
        request_change_usr: requests[i].request_change_usr,
        request_status: requests[i].request_status
      },
    });
  }
}
