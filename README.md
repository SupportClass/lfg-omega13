# lfg-omega13
This is a [NodeCG](http://github.com/nodecg/nodecg) bundle.

This bundle adds a button to the top of NodeCG dashboard that enables a user to send an urgent notification to the system
administrator via Pushover. By default, this notification will appear immediately on the sysadmin's phone, 
playing a sound and triggering a vibration every 30 seconds until it is acknowledged.

## Demo
<img src="demo.gif?raw=true"/>

## Installation
- Install to `nodecg/bundles/lfg-omega13`.
- To send Pushover alerts:
  - [Sign up for a Pushover account](https://pushover.net/login).
  - Install the Pushover app on your phone.
  - [Create a new Pushover application](https://pushover.net/apps/build). Make note of your application's token.
  - (Optional) If you want more than one person to receive notifications,
    create a delivery group for your application and have others sign up to receive notifications.
  - Create `nodecg/cfg/lfg-omega13.json`, following the format specified in the Configuration section.
- To send Slack alerts:
  - Create a [new incoming Webhook](https://my.slack.com/services/new/incoming-webhook/) for Slack, don't worry about
    the channel it's posting to, you'll set that in the bundle config. Take note of the 'Webhook URL' it gives you.

## Configuration
lfg-omega13 depends on a JSON config file being available at `nodecg/cfg/lfg-omega13.json`. It cannot function without
proper configuration. The config file has the following properties:
- `pushover`
  - `enabled`: Whether to send Pushover alerts or not.
  - `appToken`: The token of your Pushover application. 
  - `deliveryToken`: The token of either the Pushover group or individual user that notifications should be sent to.
  - `priority`: _Optional_ (Default: **2**) [See the relevant Pushover API docs](https://pushover.net/api#priority).
  - `retry`: _Optional_ (Default: **30**) 
    [See the description of Emergency priority in the Pushover API docs](https://pushover.net/api#priority).
    Only applies when `priority` is `2`.
  - `expire`: _Optional_ (Default: **3600**) 
    [See the description of Emergency priority in the Pushover API docs](https://pushover.net/api#priority).
    Only applies when `priority` is `2`.
- `slack`
  - `enabled`: Whether to send Slack alerts or not.
  - `user`: The username the alert should come from, for example 'NodeCG Alerts'.
  - `destination`: Who should the message go to, can be a #channel or a @user.
  - `url`: The Webhook URL provided by Slack when creating a new incoming Webhook.

## Usage
- Open the dashboard and click "REQUEST HELP" in the top toolbar.
- (Optional) Enter a description of the issue in the dialog that pops up.
- Confirm or deny the help request. Confirming will immediately dispatch the notification.

## Troubleshooting
Check the NodeCG console output, it should inform you of any configuration or API errors.

### License
lfg-omega13 is provided under the MIT license, which is available to read in the [LICENSE][] file.
[license]: LICENSE
