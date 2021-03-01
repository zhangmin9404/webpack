const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {

  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development',
  // 解析模块的规则
  resolve: {
    //配置解析模块路径别名: 优点简写路径,缺点路径没有提示
    alias: {
      $css: resolve(__dirname, 'src/css')
    },
    // 配置省略文件路径的后缀名
    extensions: ['.js', '.json', '.css', '.jsx'],
    // 告诉webpack 解析模块的时候应该去找哪个目录
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
  },
  devServer: {
    // 运行代码的目录
    contentBase: resolve(__dirname, 'build'),
    //监视 contentBase目录下的所有文件, 一单文件变化就会reloade
    watchContentBase: true,
    watchOptions: {
      // 忽略文件
      ignored: /node_modules/,
    },
    // 启动zip压缩
    compress: true,
    // 端口号
    port: 3000,
    //域名
    host: 'localhost',
    // 自动打开浏览器
    open: true, 
    // 开启HMR功能
    hot: true, 
    // 不要显示启动服务器日志信息
    clientLogLevel: 'none',
    // 除了一些基本启动信息以外, 其他内容都不要显示
    quiet: true,
    // 如果出现错误不要全屏提示
    overlay: false,
    // 服务代理--> 解决开发环境跨域问题
    proxy: {
      // 一旦devServer(5000)服务器收到/api/xxx的请求, 就会把请求转发到另一个服务器(3000)
      '/api': {
        target:'http://localhost: 3000',
        // 发送请求时, 请求路径重写, 将/api/xxx --> /xxx(去掉/api)
        pathRewrite: {
          '^/api': ''
        }
    // 浏览器和服务器之间有跨域,但是服务器和服务器之间是没有跨域的,
    // 代码是通过代理服务器运行,浏览器和代理服务器之间是没有跨域问题, 
    // 浏览器可以把请求发送到代理服务器上, 代理服务器替你转发到另一个服务器上
    // 服务器和服务器之间请求没有跨域问题

      }
    }

  }




}