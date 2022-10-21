const Sequelize = require('sequelize');

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
        },
        timeslot_end: {
          type: Sequelize.TIME,
          allowNull: false,
          unique: false,
        },
        duty_pid: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
        },
        timeslot_point: {
          type: Sequelize.FLOAT,
          allowNull: false,
          unique: false,
        }
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