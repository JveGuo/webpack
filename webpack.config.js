var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
//const { resolve } = require('path')

module.exports = {
    entry: {
        index: './src/js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundleCss.js'
    },
    module: {
        loaders: [
            {
		        test: /\.css$/,
		        loader:'style-loader!css-loader!postcss-loader'//添加对样式表的处理
		    },
		    {
		    	test:/\.scss$/,
		    	loader:'style-loader!css-loader!sass-loader'
		    },
		    {
		    	test:/\.(png|jpg|gif)$/i,
		    	loader:'file-loader'
		    }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            inject: 'head',
            title: 'webpack--Test',
            date: new Date(),
//          minify: {
//              removeComments: true,
//              collapseWhitespace: true
//          }
        })
    ],
    devServer: {
	    // 配置监听端口, 因为8080很常用, 为了避免和其他程序冲突, 我们配个其他的端口号
	    port: 8100,
	
	    /*
	    historyApiFallback用来配置页面的重定向
	
	    SPA的入口是一个统一的html文件, 比如
	    http://localhost:8010/foo
	    我们要返回给它
	    http://localhost:8010/index.html
	    这个文件
	
	    配置为true, 当访问的文件不存在时, 返回根目录下的index.html文件
	    */
	    historyApiFallback: true
	  }

};