export PATH := ./node_modules/.bin:$(PATH)

clean:
	rm -rf bower_components node_modules

install:
	@npm install

run:
	@webpack-dev-server --hot --content-base demos

test:
	@echo If at first you don't succeed, try, try again. Then quit. There's no point in being a damn fool about it

gh-pages:
	@sh ./gh-pages.sh
