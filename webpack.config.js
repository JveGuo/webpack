var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin'); // 文件拷贝
var OpenBrowserPlugin = require('open-browser-webpack-plugin');//自动打开浏览器
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    index: './src/js/index.js',
    a: './src/js/a.js',
    b: './src/js/b.js',
  },
  output: {
    path: path.join(__dirname, './dist'),
    // publicPath: '/www.baidu.com/', // 指定资源文件引用的目录，也就是说用这个路径指代path，页面中应该要引用的路径全部改为'baidu'
    // filename: 'bundle.js', // 指定打包为一个文件 bundle.js
    filename: 'js/[name]-[hash:6].bundle.js'
  },
   module: {
      /* 在webpack2.0 以后版本 -loader不可省略 */
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-withimg-loader'     //解决html里src路径找不到问题
          }
        ]
      },
      {
        test: /\.css$/,
        use:ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',     // 处理浏览器兼容
              options: {
                plugins: function() {
                  return [
                    require('autoprefixer')
                  ];
                }
              }
            }
          ]
        })
        // use:[
        //   'style-loader',
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       importLoaders: 1
        //       // modules: true // 设置css模块化,详情参考https://github.com/css-modules/css-modules
        //     }
        //   },
        //   {
        //     loader: 'postcss-loader',
        //     // 在这里进行配置，也可以在postcss.config.js中进行配置，详情参考https://github.com/postcss/postcss-loader
        //     options: {
        //       plugins: function() {
        //         return [
        //           require('autoprefixer')
        //         ];
        //       }
        //     }
        //   }
        // ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',   //加载url-loader 同时安装 file-loader;
            options: {
              //小于10000K的图片文件转base64到css里,当然css文件体积更大;
              limit: 10,
              //设置最终img路径;
              name: 'img/[name]-[hash:5].[ext]'
            }
          },
          {
            loader: 'img-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 模版文件
      filename: 'index.html',       // 打包后文件名
      chunks: ['index','a'],         // 应用的入口文件
      minify: { //压缩HTML文件
        removeComments: true,//移除HTML中的注释
        collapseWhitespace: true //删除空白符与换行符
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/a.html', // 模版文件
      filename: 'a.html',
      chunks: ['a','b']
    }),
    new HtmlWebpackPlugin({
      template: './src/b.html', // 模版文件
      filename: 'b.html',
      chunks: ['b']
    }),
    new webpack.HotModuleReplacementPlugin(), // 热加载插件
    new webpack.optimize.UglifyJsPlugin({ // js压缩
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin("css/../[name]-[hash:6].css"),    //将cssloader 提取成link引入
    // new CopyWebpackPlugin([              //文件拷贝
    //   {from: './src/plugins', to: './plugins'}
    // ]),
    new webpack.ProvidePlugin({             //npm install jquery --save-dev
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new OpenBrowserPlugin({                 //编译完成后自动打开浏览器
      url: 'http://localhost:8080'
    })
  ],
  devServer: {
    contentBase: "./", // 本地服务器所加载的页面所在的目录
    historyApiFallback: true, // 不跳转
    inline: true, // 实时刷新
    port: 8080,
    proxy: {
      '/api/*': {
      target: 'http://wmake.com.cn:8080',
      changeOrigin: true,
      secure: false
      }
    }
  }
}
