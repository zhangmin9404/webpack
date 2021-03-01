
/**
 * 开发环境配置: 能让代码运行起来
 * 
 * 运行指令: 
 * webpack 会将打包
 * npx webpack-dev-server 只会在内存中编译打包, 没有输出
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
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
    open: true
  }
}