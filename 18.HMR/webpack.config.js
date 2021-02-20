
/**
 HMR: hot module replacement 热模块替换 / 模块热替换
 作用: 一个模块发生变化, 只会重新打包这一个模块(而不是打包所有)
 极大提升构建速度


 样式文件: 可以使用HMR功能: 因为style-loader 内部实现了
 js文件: 默认没有HMR功能 -- > 需要修改js代码,添加支持HMR功能的代码
  注意: HMR功能对js的处理,只能处理非入口js文件的其他文件.
 HTML文件: 默认不能使用HMr功能, 同时导致问题: html文件不能热更新了(不需要做HMR功能)
 解决:  修改entry入口, 将html文件引入

 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['./src/js/index.js', './src/index.html'],
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        // 处理less文件
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'] //原来
        // loader: '!style-loader!css-loader!less-loader'
      },
      {
        // 处理css文件
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // 处理图片资源
      {
        test: /\.(jpg|gif|png|jpeg)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          // 关闭es6模块化
          esModule: false,
        }
      },
      {
        // 处理html中的img资源
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        //处理其他资源
        exclude: /\.(html|js|css|jpg|png|gif|jpeg)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
        }
      }

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true,
    // 开启HMR功能
    // 当修改了webpack配置, 新配置要想生效, 必须重启webpack服务
    hot: true
  }
}