module.exports = {    
    entry: './main.jsx',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',   //.jsx文件使用babel处理
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};