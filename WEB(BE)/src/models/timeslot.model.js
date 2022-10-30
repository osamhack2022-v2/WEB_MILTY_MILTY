const Sequelize = require('sequelize');
const moment = require('moment');

module.exports = class Timeslot extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        timeslot_pid: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: true,
          autoIncrement: true,
          unique: true,
        },
        timeslot_start: {
          type: Sequelize.TIME,
          allowNull: false,
          unique: false,
          get() {
            return moment(
              this.getDataValue('timeslot_start'),
              'hh:mm:ss',
            ).format('hh:mm');
          },
        },
        timeslot_end: {
          type: Sequelize.TIME,
          allowNull: false,
          unique: false,
          get() {
            return moment(this.getDataValue('timeslot_end'), 'hh:mm:ss').format(
              'hh:mm',
            );
          },
        },
        duty_pid: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
        },
        timeslot_point: {
          type: Sequelize.FLOAT,
          allowNull: false,
          unique: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        tableName: 'timeslot',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
};
