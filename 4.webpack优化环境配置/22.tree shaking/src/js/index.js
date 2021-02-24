import { mul, count } from './test';
import '../css/index.css';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

console.log(mul(2, 3));
console.log(count(20, 3));
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5));
