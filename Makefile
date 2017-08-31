install:
	yarn
	webpack

clean: clear-caches
	@rm -f storage/logs/laravel.log

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
