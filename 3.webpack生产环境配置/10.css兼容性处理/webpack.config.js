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
process.env.NODE_ENV === 'development'

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
          /*
          css兼容性处理: postcss --> postcss-loader postcss-preset-env


        帮postcss找到package.json中browerslist里面的配置,通过配置加载指定的css兼容
         "browserslist": {
           // 开发环境 --> 设置node环境变量: process.env.NODE_ENV === 'development'
            "development": [
              "last 1 chrome version",
              "last 1 firefox version",
              "last 1 safari version"
            ],
            // 生产环境 --> 默认是生产环境
            "production": [
              ">0.2%",
              "not dead",
              "not op_mini all"
            ]
          }
          */
          // 使用loader的默认配置
          //  'postcss-loader'
          // 修改loader的配置
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
    })
  ],
  mode: 'development'
}



