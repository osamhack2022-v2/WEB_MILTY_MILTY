const express = require('express');
const passport = require('passport');

const router = express.Router();
const {
  register,
  login,
  logout,
  authToken,
  set_user_info,
  get_user_list,
} = require('../controllers/users');
const {
  set_duty,
  get_duty,
  set_duty_timeslot,
  get_duty_timeslot,
  set_duty_schedule,
  get_duty_schedule,
  user_get_duty_schedule,
  get_user_duty_on_dashboard,
} = require('../controllers/duty');
const { get_check_count } = require('../controllers/check_count');
const {
  user_get_report,
  admin_get_report,
  admin_set_report,
} = require('../controllers/report');
const {
  admin_set_duty_request,
  admin_get_duty_request,
  user_set_duty_request,
} = require('../controllers/request');
const { set_user_exempt, get_user_exempt } = require('../controllers/exempt');

// #### User region ####
router.post(
  '/login',
  passport.authenticate('local', { failureMessage: false }),
  login,
); // 로그인
router.get('/logout', logout); // 로그아웃
router.post('/register', register); // 회원가입

router.get('/authtoken', authToken);

router.post('/set-user-info', set_user_info); // 사용자 정보 변경
router.post('/get-user-list', get_user_list);
// #### End region ####

// #### Duty region ####
router.post('/set-duty', set_duty); // 근무 종류 생성
router.post('/get-duty', get_duty); // 근무 종류 확인

router.post('/set-duty-timeslot', set_duty_timeslot); // 근무 시간대 생성
router.post('/get-duty-timeslot', get_duty_timeslot); // 근무 시간대 조회

router.post('/set-duty-schedule', set_duty_schedule); // 해당 날짜의 근무표 생성
router.post('/get-duty-schedule', get_duty_schedule); // 해당 날짜의 전체 근무 조회
router.post('/user/get-duty-schedule', user_get_duty_schedule); // 사용자의 근무 조회

router.post('/get-check-count', get_check_count); // 근무 횟수 조회
// #### End region ####

// #### Request region ####
// 근무변경
router.post('/admin/get-duty-request', admin_get_duty_request); // 근무변경 정보 받기
router.post('/admin/set-duty-request', admin_set_duty_request); // 근무변경 및 건의사항 정보 넣기
router.post('/user/set-duty-request', user_set_duty_request); // 근무변경 및 건의사항 정보 넣기
// 건의사항
router.post('/user/get-report', user_get_report); // 사용자 건의사항 정보 받기
router.post('/admin/get-report', admin_get_report); // 관리자 건의사항 정보 받기
router.post('/admin/set-report', admin_set_report); // 관리자 건의사항 처리 상태 설정
// #### End region ####

// #### Exempt region ####
// 열외자 추가, 조회
router.post('/set-user-exempt', set_user_exempt);
router.post('/get-user-exempt', get_user_exempt);
// #### End region ####

// #### Exempt region ####
// 유저 대시보드
router.post('/get-user-dashboard', get_user_duty_on_dashboard);
// #### End region ####

module.exports = router;
