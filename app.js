var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const accountRouter = require('./routes/accountRoute');
const jobOfferRouter = require('./routes/jobOfferRoute');
const recruitmentRouter = require('./routes/recruitmentRoute');
const accApiRouter = require('./routes/api/AccountApiRoute');
const jobApiRouter = require('./routes/api/JobOfferApiRoute');
const recruitmentApiRouter = require('./routes/api/RecruitmentApiRoute');

const sequelizeInit = require('./config/sequelize/init');

var app = express();
sequelizeInit()
    .catch(err => {
        console.log(err);
    });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));

const i18n = require('i18n');
i18n.configure({
    locales: ['pl', 'en', 'es'],
    directory: path.join(__dirname, 'locales'),
    objectNotation: true,
    cookie: 'job-finder-lang'
});
app.use(i18n.init);

app.use((req, res, next) => {
    if(!res.locals.lang) {
        const currentLang = req.cookies['job-finder-lang'];
        res.locals.lang = currentLang;
    }
    next();
});

const session = require('express-session');
const authUtils = require("./util/authUtils");

app.use(session({
    secret: 'my_secret_password',
    resave: false
}))

app.use((req, res, next) => {
    const loggedUser = req.session.loggedUser;
    res.locals.loggedUser = loggedUser;
    if(!res.locals.loginError) {
        res.locals.loginError = undefined;
    }
    next();
});


app.use('/', indexRouter);
app.use('/accounts', authUtils.permitAuthenticatedUser, accountRouter);
app.use('/job-offers', authUtils.permitAuthenticatedUser, jobOfferRouter);
app.use('/recruitments', authUtils.permitAuthenticatedUser, recruitmentRouter);
app.use('/api/accounts', authUtils.permitAuthenticatedUser, accApiRouter);
app.use('/api/job-offers', authUtils.permitAuthenticatedUser, jobApiRouter);
app.use('/api/recruitments', authUtils.permitAuthenticatedUser, recruitmentApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
