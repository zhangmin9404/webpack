import count from './count.js'

console.log('index.js被加载了~')

import('./add').then(({ default: add }) => { // 结构赋值, (默认暴露)提取defalt(关键字所以不能用) so重新名称为add ,
  console.log(add(1, 2))
  /*
  不使用chunkFilename
    index.html  229 bytes          [emitted]  
    js/0.js  510 bytes       0  [emitted]  
    js/main.js   9.33 KiB    main  [emitted]  main

   使用chunkFilename
      index.html  229 bytes          [emitted]  
      js/0_chunk.js  510 bytes       0  [emitted]  
      js/main.js   9.49 KiB    main  [emitted]  main
  */
})

console.log(count(3, 2))