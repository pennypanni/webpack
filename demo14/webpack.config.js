module.exports = {
    entry: './main.jsx',
    output: {
      filename: 'bundle.js'
    },
    module: {
        loaders:[
          {
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react']
            }
          },
        ]
    },
    externals: {
      // require('data') 当做一个全局变量去引用
      'data': 'data'
    }
};