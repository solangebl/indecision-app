// indicate entry and output
const path = require('path');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.join(__dirname, 'public'), // where I want to put the bundle - absolute
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				// whenever you see a .js file that is not inside node_modules run it through babel
				loader: 'babel-loader',
				test: /\.js$/, 
				exclude: /node_modules/ 
      },
      {
				// whenever you see a .scss file 
				test: /\.s?css$/, 
				use: [
          'style-loader', // 3. dump content into the dom in a styles tag
          'css-loader', // 2. read the file in
          'sass-loader', // 1. convert scss to css 
        ],
			}
		]
	},
  devtool: 'cheap-module-eval-source-map', // good for development,
  // serves bundle from memory
  devServer: { 
    // where to find static files
    contentBase: path.join(__dirname, 'public')
  }
};