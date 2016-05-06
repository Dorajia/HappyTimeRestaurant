var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');
var fs = require('fs');
var loginStyle = "display";
var logoutStyle = "display:none";

router.get('/', function (req, res) {
    // log user out
    delete req.session.token;


    // move success message into local variable so it only appears once (single read)
    var viewData = { success: req.session.success, loginStyle: loginStyle, logoutStyle: logoutStyle};

    delete req.session.success;

    res.render('login', viewData);
});


router.post('/', function (req, res) {
    // authenticate using api to maintain clean separation between layers
    request.post({
            url: config.awsApiUrl + '/user/login/' + req.body.username + '/' + req.body.password,
            form: req.body,
            json: true,
            key: fs.readFileSync('cert/key.pem'),
            cert: fs.readFileSync('cert/cert.pem'),
            requestCert:        true,
            rejectUnauthorized: false
        },
        function (error, response, body) {
            if (error) {
                return res.render('login', { error: 'An error occurred' });
            }

            if (!body.token) {
                return res.render('login', { error: 'Username or password is incorrect', username: req.body.username });
            }

            // save JWT token in the session to make it available to the angular app
            req.session.token = body.token;
            loginStyle = "display:none";
            logoutStyle = "display";

            // redirect to returnUrl
            var returnUrl = req.query.returnUrl && decodeURIComponent(req.query.returnUrl) || '/';
            res.redirect(returnUrl);
    });
});


module.exports = router;