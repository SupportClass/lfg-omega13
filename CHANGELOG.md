<a name="0.2.1"></a>
## [0.2.1](https://github.com/SupportClass/lfg-omega13/compare/v0.2.0...v0.2.1) (2016-03-07)


### Bug Fixes

* **dialog:** fix manifest path to dialog ([a7582d0](https://github.com/SupportClass/lfg-omega13/commit/a7582d0))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/SupportClass/lfg-omega13/compare/v0.1.1...v0.2.0) (2016-03-07)


### Features

* **slack:** add Slack integration ([d77957e](https://github.com/SupportClass/lfg-omega13/commit/d77957e))


### BREAKING CHANGES

* slack: Config format changed.

	To migrate the config follow the example below:

	Before:
	```json
	{
	  "appToken": "",
	  "deliveryToken": ""
	}
	```

	After:
	```json
	{
	  pushover: {
	    "enabled": true,
	    "appToken": "",
	    "deliveryToken": ""
      }
	}
	```

	This is due to the addition of Slack support, which requires
	it's own configuration, therefore each service has an object
	inside the configuration file.



<a name="0.1.1"></a>
## [0.1.1](https://github.com/SupportClass/lfg-omega13/compare/v0.1.0...v0.1.1) (2016-02-20)


### Bug Fixes

* **button:** fix button not showing up when login security was disabled ([9abcc65](https://github.com/SupportClass/lfg-omega13/commit/9abcc65))
* **pushover:** revert to previous pushover response handling behavior ([81690e2](https://github.com/SupportClass/lfg-omega13/commit/81690e2))
* **toast:** use a dedicated instance of nodecg-toast ([f48dfcc](https://github.com/SupportClass/lfg-omega13/commit/f48dfcc))

### Features

* **configschema:** add config validation via a configschema.json ([1e9a87e](https://github.com/SupportClass/lfg-omega13/commit/1e9a87e))



<a name="0.1.0"></a>
# 0.1.0 (2015-10-14)




