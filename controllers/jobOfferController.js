const JobOfferRepository = require('../repository/sequelize/JobOfferRepository');
const AccountRepository = require("../repository/sequelize/AccountRepository");

exports.showJobOfferList = (req, res, next) => {
    JobOfferRepository.getJobOffers()
        .then(jobs => {
            res.render('pages/job_offers/list', {
                jobs: jobs,
                navLocation: 'job'
            });
        });
}

exports.showAddJobOfferForm = (req, res, next) => {
    res.render('pages/job_offers/form', {
        job: {},
        pageTitle: req.__('job.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('form.actions.add'),
        formAction: '/job-offers/add',
        navLocation: 'job',
        buttonCSS: 'submit',
        validationErrors: []
    });
}

exports.showJobOfferDetails = (req, res, next) => {
    const jobId = req.params.jobId;
    JobOfferRepository.getJobOfferById(jobId)
        .then(job => {
            res.render('pages/job_offers/form', {
                job: job,
                formMode: 'showDetails',
                pageTitle: req.__('job.form.details.pageTitle'),
                formAction: '',
                navLocation: 'job',
                buttonCSS: 'edit',
                validationErrors: []
            });
        });
}

exports.showJobOfferEdit = (req, res, next) => {
    const jobId = req.params.jobId;
    JobOfferRepository.getJobOfferById(jobId)
        .then(job => {
            res.render('pages/job_offers/form', {
                job: job,
                formMode: 'edit',
                pageTitle: req.__('job.form.edit.pageTitle'),
                btnLabel: req.__('form.actions.edit'),
                formAction: '/job-offers/edit',
                navLocation: 'job',
                buttonCSS: 'edit',
                validationErrors: []
            });
        });
}

exports.addJobOffer = (req, res, next) => {
    const jobData= {...req.body};
    JobOfferRepository.createJobOffer(jobData)
        .then(result => {
            res.redirect('/job-offers')
        }).catch(err => {
        res.render('pages/job_offers/form', {
            job: jobData,
            pageTitle: 'Add job offer',
            formMode: 'createNew',
            btnLabel: 'Add',
            formAction: '/job-offers/add',
            navLocation: 'job',
            buttonCSS: 'submit',
            validationErrors: err.errors
        });
    });
}

exports.updateJobOffer = (req, res, next) => {

    const jobId = req.body._id;
    const jobData = {...req.body};
    let job;

    JobOfferRepository.getJobOfferById(jobId, jobData)
        .then(result => {
            res.redirect('/job-offers');
        }).catch(err => {
        res.render('pages/job_offers/form', {
            job: jobData,
            formMode: 'edit',
            pageTitle: 'Edit job offer',
            btnLabel: 'Edit',
            formAction: '/job-offers/edit',
            navLocation: 'job',
            buttonCSS: 'edit',
            validationErrors: err.errors
        });
    });
};

exports.updateJobOffer = (req, res, next) => {
    const jobId = req.body._id;
    const jobData = {...req.body};
    let job;
    JobOfferRepository.getJobOfferById(jobId)
        .then((jobOffer) => {
            job = jobOffer;
            jobData.recruitments = job.recruitments;
            return JobOfferRepository.updateJobOffer(jobId, jobData);
        })
        .then((result) => {
            res.redirect('/job-offers');
        })
        .catch((err) => {
            res.render('pages/job_offers/form', {
                job: jobData,
                formMode: 'edit',
                pageTitle: 'Edit job offer',
                btnLabel: 'Edit',
                formAction: '/job-offers/edit',
                navLocation: 'job',
                buttonCSS: 'edit',
                validationErrors: err.errors
            });
        });
};

exports.deleteJobOffer = (req, res, next) => {
    const jobId = req.params.jobId;
    JobOfferRepository.deleteJobOffer(jobId)
        .then( () => {
            res.redirect('/job-offers');
        });
};