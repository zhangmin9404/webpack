const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


/*
entry: 入口起点
  1. string --> './src/index.js 
    单入口
    打包形成一个chunk, 输出一个bundle文件,
    此时chunk的名称默认是main
  2.array
    多入口
    所有入口文件最终只会形成一个chunk, 输出出去只有一个bundle文件
    build文件下只有一个main.js 下面有个multi 代表多入口
    --> 只有在HMR功能中让html热更新生效

  3.object
    多入口
    有几个入口文件就形成几个chunk, 输出几个bundle文件
    此时chunk的名称是key

    --> 特殊用法: 
        entry: {
          // 所有入口文件最终只会形成一个chunk, 输出出去只有一个bundle文件
          index: ['./src/index.js', './src/count.js'],
          // 形成一个chunk, 输出一个bundle文件
          add: './src/add.js'
        },

*/
module.exports = {

  //1. entry: './src/index.js', 用的最多
  //2. entry: ['./src/index.js', './src/add.js'],
  // 3.
  entry: {
    index: ['./src/index.js', './src/count.js'],
    add: './src/add.js'
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development'

}