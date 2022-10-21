const Sequelize = require('sequelize');

module.exports = class Duty_Schedule extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        duty_schedule_pid: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: true,
          autoIncrement: true,
          unique: true,
        },
        duty_schedule_start: {
          type: Sequelize.DATE,
          allowNull: false,
          unique: false,
        },
        duty_schedule_end: {
          type: Sequelize.DATE,
          allowNull: false,
          unique: false,
        },
        duty_schedule_division_code: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
        },
        usr_pid: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
        timeslot_pid: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
        },
        duty_schedule_date: {
          type: Sequelize.DATE,
          allowNull: false,
          unique: false,
        }
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        tableName: 'duty_schedule',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
};