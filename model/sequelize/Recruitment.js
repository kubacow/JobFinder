const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Recruitment = sequelize.define('Recruitment', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dateOpened: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "error.emptyString"
            },
        }
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "error.emptyString"
            },
            len: {
                args: [2, 60],
                msg: "error.stringLen_2_60"
            }
        }
    },
    notes: {
        type: Sequelize.TEXT,
        allowNull: true,
        validate: {
            len: {
                args: [0, 255],
                msg: "Field should contain a maximum of 255 characters!"
            }
        },
    },
    acc_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    job_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = Recruitment;
