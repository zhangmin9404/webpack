/*
loader 1.下载 2 使用(配置loader)
plugin 1 下载, 2引入 3 使用
*/

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // loader配置
    ]
  },
  plugins: [
    // plugins的配置
    // html-webpack-plugin
    // 功能: 默认会创建一个空的html, 自动引入打包输出的所有资源(JS/CSS)
    // 需要有结构的HTML文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html'文件, 并且自动引入打包输出的所有资源(JS/CSS)
      template: './src/index.html'
    })

  ],
  mode: 'development'
}