require('babel-register')({
	presets: [
		require.resolve('babel-preset-es2015'),
		require.resolve('babel-preset-react')
	],
	ignore: m => {
		if (m.includes('node_modules') || m.includes('bower_components')) return true;
		else return false
	}
})