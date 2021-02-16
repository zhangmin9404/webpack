
import '../css/iconfont.css'
// import '../css/index.less'
require('!style-loader!css-loader!less-loader!./index.less');
function add (x, y) {
  return x + y
}
console.log(add(1, 2))