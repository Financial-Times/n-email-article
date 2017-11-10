const es6 = ['@financial-times/n-notification'];

require('babel-register')({
	presets: [
		require.resolve('babel-preset-node6'),
		require.resolve('babel-preset-react')
	],
	ignore: module => module.includes('/node_modules/') && !es6.some(m => module.includes(`/node_modules/${m}`))
});
