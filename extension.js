'use strict';

const request = require('request');
const querystring = require('querystring');

module.exports = function (nodecg) {
	if (!nodecg.bundleConfig) {
		throw new Error('cfg/lfg-omega13.json not found, this config file is required!');
	}

	nodecg.listenFor('help', (message, cb) => {
		if (nodecg.bundleConfig.pushover && nodecg.bundleConfig.pushover.enabled) {
			request.post({
				url: 'https://api.pushover.net/1/messages.json',
				body: querystring.stringify({
					token: nodecg.bundleConfig.appToken,
					user: nodecg.bundleConfig.deliveryToken,
					title: `${nodecg.config.host} requires assistance`,
					message: message || 'No message provided.',
					priority: nodecg.bundleConfig.priority || 2,
					retry: nodecg.bundleConfig.retry || 30,
					expire: nodecg.bundleConfig.expire || 3600
				})
			}, (err, res, body) => {
				if (err) {
					nodecg.log.error(err.stack);
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
		}
		if (nodecg.bundleConfig.slack && nodecg.bundleConfig.slack.enabled) {
			request.post({
				headers: {'content-type': 'application/json'},
				url: nodecg.bundleConfig.slack.url,
				body: JSON.stringify({
					username: nodecg.bundleConfig.slack.user,
					channel: nodecg.bundleConfig.slack.destination,
					attachments: [
						{
							"fallback": nodecg.config.host + ' requires assistance! ' + message,
							"color": 'danger',
							"title": 'Help requested by ' + nodecg.config.host,
							"text": message || 'No message provided.'
						}
					]
				})
			}, (err, res, body) => {
				if (err) {
					nodecg.log.error(err.stack);
					cb(false);
					return;
				}

				if (body === 'ok') {
					cb(true);
				} else {
					nodecg.log.error('Unknown error:', body);
					cb(false);
				}
			});
		}
	});
};
