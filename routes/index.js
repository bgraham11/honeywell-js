var express = require('express');
var router = express.Router();
var urlencode = require('urlencode');
var config = require('../config/options.global.js');

router.get('/', function(req, res, next) {

	if(req.cookies.access_token){
		//Logged in! Show the landing page
		res.render(
			'landing',
			{
				title: '3476 Panmure'
			}
		);
	} else {
		//Not logged in
		var oathLink = getAuthLink();
		res.render(
			'login',
			{
				title: '3476 Panmure',
				oathLink: oathLink
			}
		);
	}
});

var getAuthLink = function(){
	var oathLink = 'https://api.honeywell.com/oauth2/authorize?'
	oathLink += 'response_type=code&'
	oathLink += 'redirect_uri=' + urlencode(config.appAuthorizeUri) + '&';
	oathLink += '&client_id=' +  config.consumerKey;
	return oathLink;
}

module.exports = router;
