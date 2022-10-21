/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
const bcrypt = require('bcryptjs');
const Users = require('../models/users.model');

exports.register = async function (req, res) {
  let {
    user_id,
    user_password,
    user_name,
    user_birthday,
    user_division,
    user_division_code,
    user_class,
    user_discharge_date,
    checked
  } = req.body;
  // 비밀번호 암호화
  user_password = bcrypt.hashSync(user_password);

  // 기존 아이디 존재 확인
  const id = await Users.findOne({ where: { usr_id: user_id } });
  console.log('########## ID :  ', id, 'checked : ', checked, '######## \n');

  const now = new Date();

  if (id == null && checked !== true) {
    // 존재하지 않으면 회원가입 저장
    console.log('checked == false 조건문');
    let user = Users.create({
      usr_name: user_name,
      usr_id: user_id,
      usr_password: user_password,
      usr_birthday: user_birthday,
      usr_division: user_division,
      usr_division_code: user_division_code,
      usr_class: user_class,
      classification: 0,      // 병사로 가입  
      usr_discharge_date: user_discharge_date,
      created_at: now   // 가입일
    })
      .then(() => {
        return res.status(200).json('register success');
        // res.send('SUCCESS');
      })
      .catch(err => {
        throw err;
      });
  } else if (id == null && checked == true) {
    console.log('checked == true 조건문')
    // 가입할 때 이미 존재하는 id인지, 그리고 관리자 권한을 체크 했는지 확인되면 관리자로 가입 요청
    // (추후 DB에서 검토 후 classification: true로 바꾸면 관리자로 로그인)
    Users.create({
      usr_name: user_name,
      usr_id: user_id,
      usr_password: user_password,
      usr_birthday: user_birthday,
      usr_division: user_division,
      usr_division_code: user_division_code,
      usr_class: user_class,
      classification: null,     // 관리자로 가입 - DB 서버에서 관리자가 1로 바꿈.
      usr_discharge_date: user_discharge_date,
      created_at: now   // 가입일
    })
      .then(() => {
        return res.status(200).json('register request completed');
      })
      .catch(err => {
        throw err;
      });
  } else return res.status(401).json('ID is already taken.');
};
