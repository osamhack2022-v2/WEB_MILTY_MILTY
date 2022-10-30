const { Sequelize } = require('sequelize');
const path = require('path');
const requestModel = require('../models/request.model');
const userModel = require('../models/users.model');
const dutyModel = require('../models/duty.model');
const duty_scheduleModel = require('../models/duty_schedule.model');
const timeslotModel = require('../models/timeslot.model');
const exemptModel = require('../models/exempt.model');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_TABLE,
  process.env.DB_ID,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    timezone: '+09:00', // DB에 저장할 때 시간 설정
    models: [path.join(__dirname, '../models')],
  },
);

// const sequelize = new Sequelize('sqlite::memory:');
const db = {};
db.sequelize = sequelize;

db.request = requestModel;
db.user = userModel;
db.duty = dutyModel;
db.duty_schedule = duty_scheduleModel;
db.timeslot = timeslotModel;
db.exempt = exemptModel;

requestModel.init(sequelize);
userModel.init(sequelize);
dutyModel.init(sequelize);
duty_scheduleModel.init(sequelize);
timeslotModel.init(sequelize);
exemptModel.init(sequelize);

module.exports = db;
