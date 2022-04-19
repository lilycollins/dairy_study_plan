// 算法以及编程题实战

// // 1.缓存优化算法
// let obj = {1:1,2:1}
// function fabnacci(n) {
//  if(obj[n]){
//    return obj[n]
//  } else {
//    let res = fabnacci(n-1)+fabnacci(n-2)
//    obj[n] = res
//    return res
//  }
// }
// console.log(fabnacci(100))

// 2.实现全排列 fn([['a', 'b'], ['n', 'm'], ['0', '1']]) => ['an0', 'am0', 'an1', 'am1', 'bn0', 'bm0', 'bn1', 'bm0']

// 3.u.console('breakfast').setTimeout(3000).console('lunch').setTimeout(3000).console('dinner')，实现这个u
// class U {
//   constructor() {
//     this.promise = Promise.resolve()
//   }
//   console(n) { 
//     this.promise = new Promise((resolve)=>{
//       resolve(n)
//     })
//     return this
//   }
//   setTimeout(time) {
//     this.promise = new Promise((resolve)=>{
//       setTimeout(() => {
//         resolve()
//       }, time);
//     })
//     return this
//   }
// }
// const u = new U()
// console.log(u.console('breakfast').setTimeout(3000).console('lunch').setTimeout(3000).console('dinner'))