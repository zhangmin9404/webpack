
/**
 * 开发环境配置: 能让代码运行起来
 * 
 * 运行指令: 
 * webpack 会将打包
 * npx webpack-dev-server 只会在内存中编译打包, 没有输出
 */

/*
1.HMR: hot module replacement 热模块替换 / 模块热替换
作用: 一个模块发生变化, 只会重新打包这一个模块(而不是打包所有)
极大提升构建速度


样式文件: 可以使用HMR功能: 因为style-loader 内部实现了
js文件: 默认没有HMR功能 -- > 需要修改js代码,添加支持HMR功能的代码
 注意????????????: HMR功能对js的处理,只能处理非入口js文件的其他文件.
 (入口文件会将其他文件全部引入, 一旦入口文件变化, 其他文件就会重新引入, 重新加载)
HTML文件: 默认不能使用HMR功能, 同时导致问题: html文件不能热更新了(??????不需要做HMR功能)
解决:  修改entry入口, 将html文件引入, 

2. oneOf 生产环境配置优化16 18
3. tree shaking 应用程序
4. source-map
 

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
    // 功能: 默认会创建一个空的html, 自动引入打包输出的所有资源(JS/CSS)
    // 需要有结构的HTML文件
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',
  //开发服务器 devServer: 用来自动化(自动编译, 自动打开浏览器, 自动刷新页面..........)
  // 特点: 只会在内存中编译打包, 不会有任何输出(不会有build文件夹)
  // 启动devServer指令为: npx webpack-dev-server(因为是本地安装, 所以用npx)
  devServer: {
    // 项目构建后的路径
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
    // 开启HMR功能
    // 当修改webpack配置, 新配置要想生效必须重新启动
    hot: true
  }
}