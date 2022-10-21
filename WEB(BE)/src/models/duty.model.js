const Sequelize = require('sequelize');

module.exports = class Duty extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        duty_pid: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: true,
          autoIncrement: true,
          unique: true,
        },
        usr_division_code: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
        },
        duty_name: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: false,
        },
        duty_people_num: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
        },
        duty_point: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
        },

      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        tableName: 'duty',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
};