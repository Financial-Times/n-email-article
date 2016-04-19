export PATH := ./node_modules/.bin:$(PATH)

install:
	@npm install

run:
	@webpack-dev-server --hot --content-base demos

gh-pages:
	@sh ./gh-pages.sh
