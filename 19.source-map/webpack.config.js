
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
const CleanWebpackPlugin = require('clean-webpack-plugin')
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
    }),
    // new CleanWebpackPlugin()
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true,
    hot: true
  },
  // devtool: 'eval-source-map'
}
/*
source-map: 一种提供源代码到构建后代码映射技术(如果构建后代码出错了.通过映射可以追踪源代码错误)
  [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
  source-map: 外部
      错误代码准确信息 和 源代码的错误位置
  inline-source-map  内联
      错误代码准确信息 和 源代码的错误位置
      只生成一个内联source-map
  hidden-source-map 外部
      错误代码错误原因, 但是没有错误位置
      不能追踪源代码错误, 只能提示到构建后代码的错误位置
  eval-source-map  内联
       每一个文件都生成对应的source-map,都在eval函数中
       错误代码准确信息 和 源代码的错误位置

  nosources-source-map   外部
      错误代码准确信息, 但是没有任何源代码信息
  cheap-source-map   外部
      错误代码准确信息 和 源代码的错误位置
      只能精确到行, 其他的可以精确到列

  cheap-module-source-map   外部
      错误代码准确信息 和 源代码的错误位置


  内联和外部的区别: 1. 外部生成了文件, 内联没有. 2.内联构建速度更快

  开发环境: 速度快一点, 调试更友好
  速度快(eval-inline>cheap)
    eval-cheap-source-map
    eval-source-map
  调试更友好
     source-map
     cheap-module-source-map
     cheap-source-map
  --> eval-source-map /  eval-cheap-module-source-map
  生产环境: 源代码要不要隐藏? 调试要不要更友好
   内联会让代码体积更大, 所以在生产环境下
     nosources-source-map  全部隐藏

     hidden-source-map  只隐藏源代码, 会提示构建后代码错误

 --> source-map /cheap-module-source-map
*/