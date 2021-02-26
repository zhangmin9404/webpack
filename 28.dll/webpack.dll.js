/*
使用dll技术, 对某些库(第三方库: jquery, react, vue...) 进行单独打包

  当你运行webpack时, 默认查找webpack.config.js 配置文件
  需求: 需要运行webpack.dll.js文件
   --> webpack --config webpack.dll.js
*/
const { resolve } = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    // 最终打包生成的[name] --> jquery
    // ['jquery'] --> 要打包的库是jquery
    jquery: ['jquery']
  },
  output: {

    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash]'// 打包的库里面向外暴露出去的内容叫什么名字
  },
  // 前面两个配置就是专门用来打包jQuery, 暴露出来的名字就是 '[name]_[hash]'
  // 下面这个打包生成一个manifest.json --> 提供一种映射关系,jquery映射

  plugins: [
    new webpack.DllPlugin({
      name: '[name_[hash]', //映射库的暴露的内容名称,
      path: resolve(__dirname, 'dll/manifest.json') // 输出文件路径
    })
  ],
  mode: 'production'

}