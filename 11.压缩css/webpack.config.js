/*
执行webpack报错
  ERROR in ./src/css/a.css (../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js??postcss!./src/css/a.css)
    Module build failed (from ../node_modules/postcss-loader/dist/cjs.js):
    TypeError: this.getOptions is not a function
        at Object.loader (/Users/zhangmin/Desktop/练习/February/webpack/node_modules/postcss-loader/dist/index.js:38:24)

 postcss-loader的版本默认下载是5版本, 改成3版本
*/



const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
process.env.NODE_ENV === 'development'

// optimize-css-assets-webpack-plugin
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 创建style标签, 将样式放入
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // postcss的插件
                require('postcss-preset-env')()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    }),
    // 压缩css
    // new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: 'development'
}



