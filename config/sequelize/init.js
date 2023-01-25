const sequelize = require('./sequelize');

const Account = require('../../model/sequelize/Account');
const JobOffer = require('../../model/sequelize/JobOffer');
const Recruitment = require('../../model/sequelize/Recruitment');

const authUtil = require('../../util/authUtils');
const passHash = authUtil.hashPassword('12345');
module.exports = () => {
    Account.hasMany(Recruitment, {as: 'recruitments', foreignKey: {name: 'acc_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Recruitment.belongsTo(Account, {as: 'account', foreignKey: {name: 'acc_id', allowNull: false}});
    JobOffer.hasMany(Recruitment, {as: 'recruitments', foreignKey: {name: 'job_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Recruitment.belongsTo(JobOffer, {as: 'jobOffer', foreignKey: {name: 'job_id', allowNull: false}});

    let allAccounts, allJobs;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Account.findAll();
        })
        .then(accounts => {
            if( !accounts || accounts.length === 0) {
                return Account.bulkCreate([
                {
                    username: 'Kubaa',
                    password: authUtil.hashPassword('kubakuba'),
                    email: 'kuba@gmail.com',
                    name: 'Kuba',
                    surname: 'Kowalski',
                    gender: 'male',
                    creationDate: '2020-01-01'
                },
                {
                    username: 'Jakubb',
                    password: authUtil.hashPassword('jakubjakub'),
                    email: 'jakub@gmail.com',
                    name: 'Jakub',
                    surname: 'Kowal',
                    gender: 'male',
                    creationDate: '2021-01-01'
                },
                {
                    username: 'Agnieszkaa',
                    password: passHash,
                    email: 'an@gmail.com',
                    name: 'Agnieszka',
                    surname: 'Nowak',
                    gender: 'female',
                    creationDate: '2022-01-01'
                }
                ])
                .then( () => {
                    return Account.findAll();
                });
            } else {
                return accounts;
            }
        })
        .then( accounts => {
            allAccounts = accounts;
            return JobOffer.findAll();
        })
        .then( jobs => {
            if( !jobs || jobs.length === 0) {
                return JobOffer.bulkCreate([
                {
                    companyName: 'Google',
                    position: 'Data Scientist',
                    description: 'Science the data',
                    location: 'Fully Remote',
                    minSalary: null,
                    maxSalary: 32145
                },
                {
                    companyName: 'Oracle',
                    position: 'Accountant',
                    description: 'Count da money',
                    location: 'Fully Remote',
                    minSalary: 10000,
                    maxSalary: null
                },
                {
                    companyName: 'Java Bosses',
                    position: 'Senior Programmer',
                    description: 'Program stuff, idk',
                    location: 'Fully Remote',
                    minSalary: 50000,
                    maxSalary: 60000
                }
                ])
                .then( () => {
                    return Account.findAll();
                });
            } else {
                return jobs
            }
        })
        .then(jobs => {
            allJobs = jobs;
            return Recruitment.findAll();
        })
        .then( recruitments => {
            if( !recruitments || recruitments.length ===0) {
                return Recruitment.bulkCreate([
                    {
                        acc_id: 1,
                        job_id: 2,
                        dateOpened: '2022-08-08',
                        status: 'Opened',
                        notes: null
                    },
                    {
                        acc_id: 1,
                        job_id: 3,
                        dateOpened: '2022-10-08',
                        status: 'Interviewing',
                        notes: 'small loan of a million dollars'
                    },
                    {
                        acc_id: 2,
                        job_id: 3,
                        dateOpened: '2022-08-10',
                        status: 'Closed',
                        notes: null
                    }
                ]);
            } else {
                return recruitments;
            }
        });
};