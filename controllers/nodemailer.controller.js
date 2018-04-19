var nodemailer = require('nodemailer'),
path = require('path'),
mg = require('nodemailer-mailgun-transport'),
auth = {
    auth: {
      api_key: 'key-6b1cd760a7589b2f305e2fcb42f9f590',
      domain: 'mg.chromatic.ltd'
    }
},
smtpTransport = nodemailer.createTransport(mg(auth));


// middleware function to render the email from form-data in the req.body and update it to req.email

exports.composeMail = async function (req, res, next) {
//email template components: name,email,query
console.log(req.body);
    res.render(path.resolve('./views/email'), {
        name: req.body.name,
        email: req.body.email,
        query: req.body.query}, function(err, emailHTML){
            req.email =  emailHTML;
        });
    next();
};

//after the above completes this is the next function in line (see the express route that calls it) which handles the mail transport and response to the client
exports.sendMail = async function(req, res, next){
    // console.log(req.body);
    try{
        var mailOptions = {
            to: 'jdelaney2@hotmail.com',
            from: 'admin@chromatic.ltd',
            subject: 'Query',
            html: req.email
            }
        console.log(mailOptions);
        var mail = await smtpTransport.sendMail(mailOptions);
        return res.status(200).json({status: 200, data: mail, message: 'mail sent successfully'})}
        catch(e){
        res.status(400).json({status:400, message: 'unable to send message'});
    }
};

