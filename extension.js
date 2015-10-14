'use strict';

var request = require('request');
var querystring = require('querystring');

module.exports = function(nodecg) {
    if (!nodecg.bundleConfig) {
        nodecg.log.error('cfg/lfg-omega13.json was not found. ' +
            'This file is where the Pushover application and user keys are set. ' +
            'Without those, the "now playing" graphic cannot function.');
        return;
    } if (typeof nodecg.bundleConfig.appToken === 'undefined') {
        nodecg.log.error('"appToken" is not defined in cfg/lfg-omega13.json! ' +
            'This token (obtained from your Pushover application dashboard) is required to send notifications.');
        return;
    } else if (typeof nodecg.bundleConfig.deliveryToken === 'undefined') {
        nodecg.log.error('"deliveryToken" is not defined in cfg/lfg-omega13.json! ' +
            'This token (obtained from your Pushover profile) defines what user or group to ' +
            'send notification to, and is required.');
        return;
    }

    nodecg.listenFor('help', function(message, cb) {
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
        }, function(err, res, body) {
            if (err) {
                nodecg.log.err(err.stack);
                cb(false);
                return;
            }

            var json;
            try {
                json = JSON.parse(body);
            } catch(e) {
                nodecg.log.error('Could not parse response to JSON:', e.stack);
                cb(false);
                return;
            }

            if (json.status !== 1) {
                if (json.errors) {
                    var resErrString = json.errors.join('. ');
                    nodecg.log.error(resErrString);
                    cb(false);
                } else {
                    nodecg.log.error('Unknown error:', json);
                    cb(false);
                }
            } else {
                cb(true);
            }
        });
    });
};
