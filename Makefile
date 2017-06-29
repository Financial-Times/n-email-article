node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

run:
	@echo Protip: This uses the hot reloading feature with Webpack and React
	@echo Edit the JS or CSS file and you should see the change applied in the browser without any reload
	@webpack-dev-server --hot --content-base demos --port 5050 --host local.ft.com

test: verify unit-test
	@$(DONE)

unit-test:
	@mocha --require test/setup 'test/**/*.spec.js'
	@$(DONE)

a11y:

demo: run

gh-pages:
	@sh ./gh-pages.sh
	@$(DONE)
