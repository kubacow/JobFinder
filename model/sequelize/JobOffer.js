const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const JobOffer = sequelize.define('JobOffer', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    companyName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "error.emptyString"
            },
            len: {
                args: [2, 60],
                msg: "error.stringLen_2_60"
            },
        },
    },
    position: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "error.emptyString"
            },
            len: {
                args: [2, 60],
                msg: "error.stringLen_2_60"
            },
        },
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,
        validate: {
            len: {
                args: [0, 255],
                msg: "Field should contain less than 255 characters!"
            },
        },
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "error.emptyString"
            },
            len: {
                args: [2, 60],
                msg: "error.stringLen_2_60"
            },
        },
    },
    minSalary: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    maxSalary: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
});

module.exports = JobOffer;
