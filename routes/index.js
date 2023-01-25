var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/authController');
const LangController = require('../controllers/LangController');

router.get('/changeLang/:lang', LangController.changeLang);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { navLocation: 'main' });
});

module.exports = router;
