
// 引入
import print from './print.js'
import '../css/iconfont.css'
// import '../css/index.less'
require('!style-loader!css-loader!less-loader!./index.less');

console.log('index.js被重新加载了.....')

print()
function add (x, y) {
  return x + y
}
console.log(add(1, 2))

// 一旦module.hot为true, 说明开启HMR功能, -->HMR功能代码生效
if (module.hot) { 
  module.hot.accept('./print.js', function() {
    // 方法会监听print.js文件的变化, 一旦发生变化,其他模块不会重新打包构建
    // 会执行后面的回调函数
    print()

  })
}