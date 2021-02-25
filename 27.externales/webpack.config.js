
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })

  ],
  mode: 'production',
  externals: { 
    // 拒绝一些包参与打包, 
    // 忽略库名: npm 包名
    // 拒绝jQuery被打包进来, 在js中引入jquery 打印报错 找不到
    //所以在html中通过script标签手动引入进来, 这就是为什么cdn可以加快速度??
    jquery: 'jQuery'
  }
}