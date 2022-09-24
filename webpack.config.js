const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PORT = 3001;

module.exports = {
	mode: 'none',
	entry: './src/index.js',
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist')
		},
		// contentBase: path.join(__dirname, 'dist'),
		port: PORT
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './public/index.html',
			// publicPath: './public/scripts/'
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.js$/i,
				use: 'babel-loader'
			}
		]
	},
	optimization: {
		nodeEnv: 'development'
	}
}