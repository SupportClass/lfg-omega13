'use strict';

var request = require('request');
var querystring = require('querystring');

module.exports = function (nodecg) {
	nodecg.listenFor('help', function (message, cb) {
		request.post({
			url: 'https://api.pushover.net/1/messages.json',
			body: querystring.stringify({
				token: nodecg.bundleConfig.appToken,
				user: nodecg.bundleConfig.deliveryToken,
				title: nodecg.config.host + ' requires assistance',
				message: message || 'No message provided.',
				priority: nodecg.bundleConfig.priority || 2,
				retry: nodecg.bundleConfig.retry || 30,
				expire: nodecg.bundleConfig.expire || 3600
			})
		}, function (err, res, body) {
			if (err) {
				nodecg.log.err(err.stack);
				cb(false);
				return;
			}

			var json;
			try {
				json = JSON.parse(body);
			} catch (e) {
				nodecg.log.error('Could not parse response to JSON:', e.stack);
				cb(false);
				return;
			}

			/* enslint-disable no-lonley-if */
			if (json.status === 1) {
				cb(true);
			} else {
				if (json.errors) {
					var resErrString = json.errors.join('. ');
					nodecg.log.error(resErrString);
					cb(false);
				} else {
					nodecg.log.error('Unknown error:', json);
					cb(false);
				}
			}
			/* enslint-enable no-lonley-if */
		});
	});
};
