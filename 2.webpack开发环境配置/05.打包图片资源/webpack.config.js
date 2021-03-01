

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
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        //  问题: 处理不了html中的img文件
        // 处理图片
        test: /\.(jpg|png|gif|jpeg)$/,
        // 下载url-loader file-loader 因为 前者是依赖后者的
        loader: 'url-loader',
        options: {
          // 图片大小小于20kb , 就会被base64处理
          // 优点: 减小请求数量(减轻服务器压力)
          // 缺点: 图片体积更大(文件请求速度更慢)(8~12kb)
          limit: 20 * 1024,
          // 问题: 因为url-loader默认使用es6模块化解析, 而html-loader引入图片是commonjs
          // 解析时会出现问题: 
          // 解决: 关闭url-loader的es6模块化, 使用commonjs解析
          esModule: false,
          // 给图片命名
          // [hash:10]取图片的hash的前10位,
          // [ext]取文件原来的扩展名
          name: '[hash:10].[ext]'
        }
      },
      {
        test: /\.html$/,
        //处理html文件中的img文件, (负责引入img, 从而能被url-loader进行处理)
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
}