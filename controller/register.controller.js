var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');
var fs = require('fs');


var loginStyle = "display";
var logoutStyle = "display:none";

router.get('/', function (req, res) {
    res.render('register',
        {
            loginStyle: loginStyle,
            logoutStyle: logoutStyle
        });
});


router.post('/', function (req, res) {
    // register using api to maintain clean separation between layers
    request.post({
        //url: config.awsApiUrl + '/user/signup/' + req.body.username + '/' + req.body.password + '/' + req.body.phonenum + '/' + req.body.email + '/',
        url: config.awsApiUrl + '/user/signup/' + req.body.username + '/' + req.body.password + '/' + req.body.email + '/' + req.body.phonenum + '/',
        form: req.body,
        json: true,
        key: fs.readFileSync('cert/key.pem'),
        cert: fs.readFileSync('cert/cert.pem'),
        requestCert:        true,
        rejectUnauthorized: false
    }, function (error, response, body) {
        if (error) {
            return res.render('register',
                {
                    error: 'An error occurred',
                    loginStyle: loginStyle,
                    logoutStyle: logoutStyle
                });
        }

        if (response.statusCode !== 200 || !response.body.success) {
            return res.render('register', {
                error: response.body.msg,
                username: req.body.username,
                phonenum: req.body.phonenum,
                email: req.body.email,
                loginStyle: loginStyle,
                logoutStyle: logoutStyle
            });
        }

        // return to login page with success message
        req.session.success = 'Registration successful';
        return res.redirect('/login');
    });
});

module.exports = router;