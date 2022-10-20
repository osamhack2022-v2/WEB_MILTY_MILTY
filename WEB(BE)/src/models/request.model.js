const Sequelize = require('sequelize');
/*
`request_pid`	int	NOT NULL,
  `request_list`	varchar2(30)	NULL,
  `request_duty`	date	NULL,
  `request_reason`	varchar2(100)	NULL,
  `request_day`	date	NULL,
  `request_user`	int	NULL,
  `request_changes`	int	NULL
*/
module.exports = class Request extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        request_pid: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: true,
          unique: true,
        },
        request_type: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
        },
        duty_schedule_pid: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
        },
        request_reason: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: false,
        },
        request_date: {
          type: Sequelize.DATE,
          allowNull: false,
          unique: false,
        },
        request_usr: {
          type: Sequelize.INTEGER,
          allowNull: true,
          unique: false,
        },
        request_change_usr: {
          type: Sequelize.INTEGER,
          allowNull: true,
          unique: false,
        },
        request_status: {
          type: Sequelize.INTEGER,
          allowNull: true,
          unique: false,
        }
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        tableName: 'request',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
};
