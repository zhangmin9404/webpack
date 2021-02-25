import { mul, count } from './test';
import '../css/index.css';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

console.log(mul(2, 3));
console.log(count(20, 3));
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5));

/*
1. eslint不认识window. navigator全局变量
  解决: 需要修改package.json中的eslintConfig配置
    "env": {
      "browser": true
    }
2. servicewoker必须运行在服务器上
  -> node.js
  -> npm i serve -g
     serve -s build 启动服务器, 将build目录下所有资源作为静态资源暴露出去\

  问题: npm i serve@5 -g 要下5版本的 , 如果下载6版本的 启动服务器的时候会报错, 说.then这一步报错, 奇怪 ????

  成功以后在浏览器application中会发现service Workers   cache Storage
  断网 : network offline 离线也可以访问

*/

// 注册servicework
// 处理兼容性问题

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('service-worker.js')
      .then(() => {
        console.log('sw注册成功了');
      })
      .catch(() => { console.log('sw注册失败了'); });
  });
}
