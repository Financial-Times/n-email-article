require('babel-register')({
	presets: [
		require.resolve('babel-preset-es2015-node4'),
		require.resolve('babel-preset-react')
	]
})