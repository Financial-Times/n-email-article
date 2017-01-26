const path = require('path')
const webpack = require('webpack')

const isDevServer = process.argv.find(v => v.indexOf('webpack-dev-server') !== -1)

module.exports = {
	entry: !isDevServer ? ['./demos/non-hot-reload'] : [
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		'./demos/hot-reload'
	],
	resolve: {
		alias: {
			react: 'preact-compat',
			'react-dom': 'preact-compat'
		}
	},
	output: {
		filename: 'bundle.js'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: [
					'babel?' + JSON.stringify({
						presets: ['es2015', 'react'],
						plugins: [
							// the loose: true flag is for old IE support
							[require.resolve('babel-plugin-transform-es2015-classes'), { loose: true }],
							require.resolve('babel-plugin-transform-es2015-template-literals')
						]
					}),
					'eslint'
				]
			},
			{
				test: /\.scss$/,
				loaders: [
					'style',
					'css',
					'sass?' + JSON.stringify({
						includePaths: [path.resolve(__dirname, './bower_components')]
					})
				]
			},
			{
				test: /\.html/,
				loader: 'raw'
			}
		]
	},
	plugins: isDevServer ? [] : [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"'
		})
	]
}
