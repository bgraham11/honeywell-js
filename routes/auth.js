var express = require('express');
var router = express.Router();
var util = require('util');
var exec = require('child_process').exec;
var urlencode = require('urlencode');
var base64 = require('base-64');

var config = require('../config/options.global.js');

router.get('/', function(req, res, next) {
	var code = req.query.code;
	var base64Auth = base64.encode(
		config.consumerKey + ':' + config.consumerPrivate
	);

	var curlString = '';
	curlString += 'curl -X POST ';
	curlString += '--header "Authorization: Basic ' + base64Auth + '" ';
	curlString += '--header "Accept: application/json" ';
	curlString += '--header "Content-Type: application/x-www-form-urlencoded" ';
	curlString += '-d "';
	curlString +=   'grant_type=authorization_code&';
	curlString +=   'code=' + code + '&';
	curlString +=   'redirect_uri=' + urlencode(config.appAuthorizeUri) + '&';
	curlString += '" ';
	curlString += '"https://api.honeywell.com/oauth2/token"';
	console.log('OAuth Postback detected... validating code!');

	console.log(curlString);
	var child = exec(
		curlString,
		function(error, stdout, stderr){
			//console.log('stdout: ' + stdout);
			//console.log('stderr: ' + stderr);
			var response = JSON.parse(stdout);
			console.log('Setting Access Token: ', response.access_token);
			res.cookie( 'access_token', response.access_token);
			//req.cookies.access_token = response.access_token;
			if(error !== null)
			{
				console.log('exec error: ' + error);
			}
			res.redirect('/');
		}
	);
});

router.get('/logout', function(req, res, next) {
	res.clearCookie( 'access_token');
	res.redirect('/');
});

module.exports = router;
