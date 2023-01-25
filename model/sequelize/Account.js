    const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');
const {now} = require("sequelize/lib/utils");
const Account = sequelize.define('Account', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "error.emptyString"
            },
            len: {
                args: [2, 60],
                msg: "error.stringLen_2_60"
            },
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {

                msg: "error.emptyString"
            },
            len: {
                args: [8, 60],
                msg: "error.stringLen_8"
            },
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "error.emptyString"
            },
            isEmail: {
                msg: "error.notEmail"
            },
            len: {
                args: [5, 60],
                msg: "error.stringLen_5_60"
            },

        }
    },
    name: {
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
        }
    },
    surname: {
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
        }
    },
    gender: {
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
        }
    },
    creationDate: {
        type: Sequelize.DATE,
        validate: {
            isDate: true,
            isPastDate(value) {
                if (value >= new Date()) {
                    throw new Error('error.pastDate');
                }
            }
        }
    }
});

module.exports = Account;