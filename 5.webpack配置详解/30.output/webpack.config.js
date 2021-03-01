const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {

  entry: './src/index.js',
  output: {
    // 文件名称(指定名称+目录)
    filename: 'js/[name].js',
    // 输出文件目录(将来所有资源输出的公共目录)
    path: resolve(__dirname, 'build'),
    // 所有资源引入公共路径的前缀 -->'img/a.jpg' --> /imgs/a.jpg
    publicPath: '/',
    chunkFilename: 'js/[name]_chunk.js', // 非入口chunk的名称 
    // entry指定的入口就是入口chunk
    // 什么情况下才是非入口chunk 1. 通过import语法  2.optimyzation 将node_module里面的东西
    library: '[name]', //整个库向外暴露的变量名 打包后的main.js 会暴露main方法
    // libraryTarget: 'window', // 变量名称添加到哪个上 browser
    libraryTarget: 'global', // 变量名称添加到哪个上 node
    // libraryTarget: 'commonjs', 
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development'

}