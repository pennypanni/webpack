module.exports={
	entry:'./main.jsx',
	output: {
		filename:'bundle.js'
	},
	module:{
		loaders:[
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015','react']
				}
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader?modules'
			}	
		]
	}
}