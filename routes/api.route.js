var express = require('express');
var router = express.Router();

var mailer = require('./api/nodemailer.route');

router.use('/mail', mailer);

module.exports = router;