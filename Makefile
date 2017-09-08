install:
	yarn
	make css
	make webpack
	make watch-css

build:
	make clean
	make css
	make webpack
	make watch-css

build_prod:
	make clean
	yarn
	make css
	make webpack-production

clean:
	@rm -rf ./public/_css
	@rm -rf ./public/_js
	@rm -rf ./public/_fonts
	@rm -rf ./public/_img

css:
	@mkdir -p ./public/_css
	node ./node_modules/.bin/node-sass ./assets/css -o ./public/_css
	@node ./assetsScripts/css.js --directory ./public/_css/**/*

watch-css:
	@node ./assetsScripts/watch.js "./assets/css/**/*"

webpack-dev:
	node node_modules/cross-env/dist/bin/cross-env.js NODE_ENV=development node_modules/webpack/bin/webpack.js

webpack:
	node node_modules/cross-env/dist/bin/cross-env.js NODE_ENV=development node_modules/webpack/bin/webpack.js --watch --progress


webpack-hot:
	node node_modules/cross-env/dist/bin/cross-env.js NODE_ENV=development node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline --hot

webpack-production:
	node node_modules/cross-env/dist/bin/cross-env.js NODE_ENV=production node_modules/webpack/bin/webpack.js

storybook:
	node ./node_modules/.bin/start-storybook -p 9001

storybook-static:
	node ./node_modules/.bin/build-storybook -o ./public/storybook
