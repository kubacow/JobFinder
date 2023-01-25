const Account = require("../../model/sequelize/Account");
const Recruitment = require("../../model/sequelize/Recruitment");
const JobOffer = require("../../model/sequelize/JobOffer");
const authUtil = require("../../util/authUtils")

exports.getAccounts = () => {
    return Account.findAll();
};

exports.getAccountById = (accId) => {
    return Account.findByPk(accId,
        {
            include: [{
                model: Recruitment,
                as: 'recruitments',
                include: [{
                    model: JobOffer,
                    as: 'jobOffer'
                }]
            }]
        });
};

exports.createAccount = (newAccData) => {
    return Account.create({
        username: newAccData.username,
        password: authUtil.hashPassword(newAccData.password),
        email: newAccData.email,
        name: newAccData.name,
        surname: newAccData.surname,
        gender: newAccData.gender,
        creationDate: newAccData.creationDate
    });
};

exports.updateAccount = (accId, accData) => {
    const username = accData.username;
    const password = authUtil.hashPassword(accData.password);
    const email = accData.email;
    const name = accData.name;
    const surname = accData.surname;
    const gender = accData.gender;
    const creationData = accData.creationDate;
    return Account.update(accData, {where: {_id: accId }});
};

exports.deleteAccount = (accId) => {
    return Account.destroy({
        where: {_id: accId}
    });
};

exports.findByEmail = (email) => {
    return Account.findOne({
        where: {email: email}
    });
}