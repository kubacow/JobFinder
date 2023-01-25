const AccountRepository = require('../repository/sequelize/AccountRepository');

exports.showAccountList = (req, res, next) => {
    AccountRepository.getAccounts()
        .then(accs => {
            res.render('pages/account/list', {
                accs: accs,
                navLocation: 'acc'
            });
        });
}

exports.showAddAccountForm = (req, res, next) => {
    res.render('pages/account/form', {
        acc: {},
        pageTitle: req.__('acc.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('form.actions.add'),
        formAction: '/accounts/add',
        navLocation: 'acc',
        validationErrors: []
    });
}

exports.showAccountDetails = (req, res, next) => {
    const accId = req.params.accId;
    AccountRepository.getAccountById(accId)
        .then(acc => {
            res.render('pages/account/form', {
                acc: acc,
                formMode: 'showDetails',
                pageTitle: req.__('acc.form.details.pageTitle'),
                formAction: '',
                navLocation: 'acc',
                validationErrors: []
            });
        });
}

exports.showAccountEdit = (req, res, next) => {
    const accId = req.params.accId;
    AccountRepository.getAccountById(accId)
        .then(acc => {
            res.render('pages/account/form', {
                acc: acc,
                formMode: 'edit',
                pageTitle: req.__('acc.form.edit.pageTitle'),
                btnLabel: req.__('form.actions.edit'),
                formAction: '/accounts/edit',
                navLocation: 'acc',
                validationErrors: []
            });
        });
}

exports.addAccount = (req, res, next) => {
    const accData = {...req.body};
    AccountRepository.createAccount(accData)
        .then(result => {
            res.redirect('/accounts');
        }).catch(err => {
        err.errors.forEach(e => {
            if (e.path.includes('username') && e.type === 'unique violation') {
                e.message = 'Username is being used!';
            }
             else if (e.path.includes('email') && e.type === 'unique violation') {
                e.message = 'Email is being used!';
            }
        })
        res.render('pages/account/form', {
            acc: accData,
            pageTitle: req.__('acc.form.add.pageTitle'),
            formMode: 'createNew',
            btnLabel: req.__('form.actions.add'),
            formAction: '/accounts/add',
            navLocation: 'acc',
            buttonCSS: 'submit',
            validationErrors: err.errors
        });
    });
};

exports.updateAccount = (req, res, next) => {
    const accId = req.body._id;
    const accData = {...req.body};
    let acc;
    AccountRepository.getAccountById(accId)
        .then((account) => {
            acc = account;
            accData.recruitments = acc.recruitments;
            return AccountRepository.updateAccount(accId, accData);
        })
        .then((result) => {
            res.redirect('/accounts');
        })
        .catch((err) => {
        err.errors.forEach(e => {
            if (e.path.includes('username') && e.type === 'unique violation') {
                e.message = 'Username is being used!';
            }
            else if (e.path.includes('email') && e.type === 'unique violation') {
                e.message = 'Email is being used!';
            }
        })
        res.render('pages/account/form', {
            acc: accData,
            formMode: 'edit',
            pageTitle: req.__('acc.form.edit.pageTitle'),
            btnLabel: req.__('form.actions.edit'),
            formAction: '/accounts/edit',
            navLocation: 'acc',
            buttonCSS: 'edit',
            validationErrors: err.errors
        });
    });
};

exports.deleteAccount = (req, res, next) => {
    const accId = req.params.accId;
    AccountRepository.deleteAccount(accId)
        .then( () => {
            res.redirect('/accounts');
        });
};