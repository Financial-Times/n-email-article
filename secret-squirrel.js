module.exports = {
	files: {
		allow: [],
		allowOverrides: []
	},
	strings: {
		deny: [],
		denyOverrides: [
			'gifting@notice.ft.com', // components/footnote.js:5
			'test-forward@ftqa.org', // demos/demos-config.js:60
			'737195aa-1347-11e6-839f-292294709880', // (example article UUID) demos/demos.js:58
			'b@b.com' // test/data/actions.spec.js:14
		]
	}
};
