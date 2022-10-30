/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
const User = require('../models/users.model');
const Duty = require('../models/duty.model');
const Timeslot = require('../models/timeslot.model');
Timeslot.belongsTo(Duty, { foreignKey: 'duty_pid' });
const Duty_Schedule = require('../models/duty_schedule.model');
const Exempt = require('../models/exempt.model');
const { Op } = require('sequelize');
const { sequelize } = require('../models/users.model');

// 근무 종류 생성(구현 완료)
exports.set_duty = async (req, res) => {
  const {
    usr_division_code, // 부대 코드
    duty_name, // 근무 종류
    duty_people_num, // 시간대별 근무 투입 인원 수
  } = req.body;

  await Duty.create({
    usr_division_code, // Front에 있는 현재 로그인된 부대 관리자의 부대코드를 활용하여 근무 부대코드에 저장
    duty_name,
    duty_people_num,
  });

  res.status(200).json({ result: 'success' });
};

// 근무 종류 조회(구현 완료)
exports.get_duty = async (req, res) => {
  const { usr_division_code } = req.body;
  const data = await Duty.findAll({
    where: { usr_division_code },
  });

  console.log('근무 종류 조회 : ', data);

  res.status(200).json({ result: 'success', duty: data });
};

// 경작서 틀 생성(구현 완료)
exports.set_duty_timeslot = async function (req, res) {
  const { duty_pid, timeslot } = req.body;

  // 기존에 있던 해당 Duty에 대한 Timeslot 삭제
  const existed_timeslot = await Timeslot.findOne({
    where: { duty_pid },
  });
  if (existed_timeslot) {
    Timeslot.destroy({ where: { duty_pid } });
  }

  console.log(timeslot);

  // 타임슬롯 생성
  for (const t of timeslot) {
    Timeslot.create({
      timeslot_start: t.timeslot_start,
      timeslot_end: t.timeslot_end,
      duty_pid,
      timeslot_point: t.timeslot_point,
    });
  }

  res.status(200).json({ result: 'success' });
};

// 경작서 틀 조회(구현 완료)
exports.get_duty_timeslot = async (req, res) => {
  const { duty_pid } = req.body;
  const data = await Timeslot.findAll({ where: { duty_pid } });
  const duty = await Duty.findOne({
    attributes: ['duty_name'],
    where: { duty_pid },
  });
  console.log('경작서 틀 조회 : ', data, '근무 이름 : ', duty.duty_name);
  return res.status(200).json({
    result: 'success',
    timeslot: data,
    duty_name: duty.duty_name,
  });
};

// 해당 날짜의 경작서(인원 배치)생성(민철님 작업)
exports.set_duty_schedule = async (req, res) => {
  const { user_division_code, date } = req.body;

  try {
    // ==== Region : 해당 부대의 duty_pid 리스트 불러오기 ====
    const duty_pid_objects = await Duty.findAll({
      attributes: ['duty_pid', 'usr_division_code'],
      where: { usr_division_code: user_division_code },
    });

    let duty_pid_list = [];
    for (const d of duty_pid_objects)
      duty_pid_list.push(d.dataValues['duty_pid']);

    console.log('##### duty pid list #####\n', duty_pid_list);

    // 해당 일자 timeslots 리스트(timeslot_pid, timeslot_point 가 중요)(이 부분 고쳐야 합니다.)
    let timeslot_list = [];
    for (const duty_pid of duty_pid_list) {
      const timeslots_objects = await Timeslot.findAll({
        attributes: ['timeslot_pid', 'timeslot_point', 'duty_pid'],
        where: { duty_pid: duty_pid },
      });

      for (const d of timeslots_objects)
        timeslot_list.push({
          timeslot_pid: d.dataValues['timeslot_pid'],
          timeslot_point: d.dataValues['timeslot_point'],
          duty_pid: d.dataValues['duty_pid'],
        });
    }

    console.log('timeslots 리스트', timeslot_list);
    // ==== End Region ====

    // ==== Start Region : 현재 열외자 리스트 생성((이 부분 고쳐야 합니다. 열외자 리스트는 잘 나오는데 기간에 따라서 걸려지지가 않습니다.) ====
    const current_excluder_objects = await Exempt.findAll({
      attributes: ['usr_pid'],
      where: { exempt_division_code: user_division_code },
      [Op.and]: [
        {
          timeslot_start: { [Op.lte]: date },
        },
        {
          timeslot_end: { [Op.gte]: date },
        },
      ],
    });
    let current_excluder_list = [];
    for (const d of current_excluder_objects)
      current_excluder_list.push(d.dataValues['usr_pid']);
    console.log('현재 열외자 리스트 : ', current_excluder_list);

    // 근무자 리스트 생성(후보 user들의 리스트)
    const usrs_objects = await User.findAll({
      attributes: ['usr_pid', 'usr_point'],
      where: {
        [Op.and]: {
          usr_division_code: user_division_code,
          usr_class: {
            [Op.or]: ['이병', '일병', '상병', '병장'],
          },
        },
      },
    });

    // SQL 문에서 열외자를 거르는 대신, 미리 다 불러놓고 JS단에서 열외자 리스트에 있는 경우를 제외했습니다.
    let usr_list = [];
    for (const d of usrs_objects) {
      if (current_excluder_list.indexOf(d.dataValues['usr_pid']) != -1)
        continue;
      usr_list.push({
        usr_pid: d.dataValues['usr_pid'],
        usr_point: d.dataValues['usr_point'],
      });
    }
    console.log('근무자 리스트 : ', usr_list);

    // 근무자 - 근무 매칭
    usr_list.sort((a, b) => {
      return a['usr_point'] > b['usr_point'];
    });
    // 최악의 상황에서도 근무 가능자 수 x 4 >= 필요 근무자라고 가정 (일반적으로는 근무 가능자 >= 필요 근무자)
    usr_list = usr_list.concat(usr_list.slice());
    usr_list = usr_list.concat(usr_list.slice());

    if (usr_list.length < timeslot_list.length)
      throw new Error('근무 가능 인원 부족');

    timeslot_list.sort((a, b) => {
      return a['timeslot_point'] < b['timeslot_point'];
    });

    console.log('정렬된 timeslot 리스트:', timeslot_list);

    for (let i = 0; i < timeslot_list.length; i++) {
      // timeslot_list[i]와 usr_list[i]를 매칭
      console.log(
        'matching ' +
          usr_list[i]['usr_pid'] +
          ' -- ' +
          timeslot_list[i]['timeslot_pid'],
      );
      Duty_Schedule.create({
        duty_schedule_division_code: user_division_code,
        duty_schedule_date: date,
        timeslot_pid: timeslot_list[i]['timeslot_pid'],
        usr_pid: usr_list[i]['usr_pid'],
        duty_pid: timeslot_list[i]['duty_pid'],
      });

      console.log('duty_schedule 모델 데이터:', await Duty_Schedule.findAll());
      // usr_list[i]['usr_pid']를 가진 user의 usr_point에 timeslot_list[i]['timeslot_point'] 가산
      // UPDATE User
      //   SET usr_point = usr_point + timeslot_list[i]['timeslot_point']
      //   WHERE usr_pid = usr_list[i]['usr_pid']
      User.increment(
        { usr_point: timeslot_list[i]['timeslot_point'] },
        { where: { usr_pid: usr_list[i]['usr_pid'] } },
      );
    }

    return res.status(200).json({ result: 'success' });
  } catch (err) {
    console.warn(err);
    return res.status(200).json({ result: 'fail' });
  }
};

// 해당 날짜의 근무표 조회
exports.get_duty_schedule = async (req, res) => {
  const { user_division_code, date } = req.body;

  try {
    const schedule = await Duty_Schedule.findAll({
      attributes: ['usr_pid', 'timeslot_pid'],
      where: {
        [Op.and]: [
          { duty_schedule_division_code: user_division_code },
          sequelize.where(
            sequelize.fn('date', sequelize.col('duty_schedule_date')),
            '=',
            date,
          ),
        ],
      },
    });

    let data = {};
    await Promise.all(
      schedule.map(async ({ duty_schedule_pid, timeslot_pid, usr_pid }) => {
        const { usr_class, usr_name } = await User.findOne({
          where: { usr_pid },
        });
        const { duty_pid, timeslot_start, timeslot_end } =
          await Timeslot.findOne({ where: { timeslot_pid } });
        const { duty_name } = await Duty.findOne({ where: duty_pid });

        if (data[duty_pid] === undefined) {
          data[duty_pid] = {};
          data[duty_pid].duty_pid = duty_pid;
          data[duty_pid].duty_name = duty_name;
          data[duty_pid].schedule = [];
        }
        data[duty_pid].schedule.push({
          pid: duty_schedule_pid,
          start_time: timeslot_start,
          end_time: timeslot_end,
          user_name: `${usr_class} ${usr_name}`,
        });
      }),
    );

    console.log(Object.values(data));
    res.status(200).json({ result: 'success', duty: Object.values(data) });
  } catch (err) {
    console.warn(err);
    res.status(200).json({ result: 'fail' });
  }
};

// 본인(병사)의 근무 스케줄 조회
exports.user_get_duty_schedule = async (req, res) => {
  const { user_pid } = req.body;

  try {
    const schedule = await Duty_Schedule.findAll({
      where: { usr_pid: user_pid },
    });

    const data = await Promise.all(
      schedule.map(
        async ({ duty_schedule_pid, duty_schedule_date, timeslot_pid }) => {
          const { duty_pid, timeslot_start, timeslot_end } =
            await Timeslot.findOne({ where: { timeslot_pid } });
          const { duty_name } = await Duty.findOne({ where: duty_pid });

          return {
            pid: duty_schedule_pid,
            duty_name,
            date: duty_schedule_date,
            start_time: timeslot_start,
            end_time: timeslot_end,
          };
        },
      ),
    );

    res.status(200).json({ result: 'success', schedule: data });
  } catch (err) {
    console.warn(err);
    res.status(200).json({ result: 'fail' });
  }
};

// 근무 존재 여부 확인
exports.check_duty_schedule = async (req, res) => {
  const { division_code } = req.body;

  try {
    const schedule = await Duty_Schedule.findAll({
      where: { duty_schedule_division_code: division_code },
    });

    let data = {};
    await Promise.all(
      schedule.map(async ({ duty_schedule_date }) => {
        data[duty_schedule_date] = true;
      }),
    );

    console.log(Object.keys(data));
    res.status(200).json({ result: 'success', date: Object.keys(data) });
  } catch (err) {
    console.warn(err);
    res.status(200).json({ result: 'fail' });
  }
};

// 유저 근무 대시보드 조회(수정중)
exports.get_user_duty_on_dashboard = async (req, res) => {
  const { user_pid } = req.body;
};
