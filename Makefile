include n.Makefile

run:
	@echo Protip: This uses the hot reloading feature with Webpack and React
	@echo Edit the JS or CSS file and you should see the change applied in the browser without any reload
	@webpack-dev-server --hot --content-base demos --https --port 5050 --host local.ft.com

test: verify unit-test
	@$(DONE)

unit-test:
	@mocha --require test/setup.js 'test/**/*.spec.js'
	@$(DONE)

gh-pages:
	@sh ./gh-pages.sh
	@$(DONE)
