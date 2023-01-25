const i18n = require('i18n');

exports.changeLang = (req, res, next) => {
    const newLang = req.params.lang;

    if(['pl','en', 'es'].includes(newLang)) {
        res.cookie('job-finder-lang', newLang);
    }
    res.redirect(req.headers.referer);

}