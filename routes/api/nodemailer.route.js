var express = require('express');
var router = express.Router();
var mailController = require('../../controllers/nodemailer.controller');

router.post('/', mailController.composeMail,  mailController.sendMail);

module.exports = router;