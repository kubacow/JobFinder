const AccountRepository = require('../repository/sequelize/AccountRepository');
const authUtil = require("../util/authUtils");


exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    AccountRepository.findByEmail(email)
        .then(acc => {
            if(!acc) {
                res.require('index', {
                    navLocation: '',
                    loginError: "Wrong email address or password."
                })
            } else if(authUtil.comparePasswords(password, acc.password) === true) {
                req.session.loggedUser = acc;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: "Wrong email address or password."
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}