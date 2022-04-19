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

// 2.实现u.console('breakfast').setTimeout(3000).console('lunch').setTimeout(3000).console('dinner')，实现这个u
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


// // 写一个函数，第一秒打印1，第二秒打印2
// // js实现一个打点计时器，从start到end，每隔100毫秒打印一个数字，每次数字增幅为1，
// // 返回中包含一个cancel方法，用于停止定时操作，第一个数要立即返回
// function printNumber(start, end) {
//     if(start<end) {console.log(start++)}
//     let timmer = setTimeout(() => { printNumber(start, end) }, 1000);
//     return concel= function(timmer) { clearTimeout(timmer) }   
// }
// printNumber(1,3)


// // 编写代码，满足以下条件： 
// // （1）Hero(“37er”);执行结果为 Hi! This is 37er 
// // （2）Hero(“37er”).kill(1).recover(30);执行结果为 Hi! This is 37er Kill 1 bug Recover 30 bloods 
// // （3）Hero(“37er”).sleep(10).kill(2)执行结果为 Hi! This is 37er 
// // //等待10s后 Kill 2 bugs  //注意为bugs （双斜线后的为提示信息，不需要打印）
// class MYHero {
//     constructor() {
//         return (name)=> {
//             console.log(' Hi! This is ' + name)
//             this.promise = Promise.resolve()
//             return this
//         }           
//     }
//     kill(count) {
//         this.promise.then((val)=>{
//             setTimeout(()=>{    
//                 console.log('kill '+count + '  bug')
//             }, val) 
//         })
//         return this
//     }
//     recover (re) {
//         this.promise.then((val)=>{
//             setTimeout(()=>{    
//                 console.log('Recover '+ re + ' bloods ') 
//             }, val)         
//         })
//         return this
//     }
//     sleep (time) {
//         let timmer = time * 1000
//             this.promise = new Promise(resolve=>{     
//                 resolve(timmer)        
//             }) 
//             return this
//     }
// }
// let Hero = new MYHero('zhangsan')
// // Hero('37er')
// // Hero('37er').kill(1).sleep(3).recover(30)
// // Hero('37er').sleep(3).kill(2)


// // 函数curry化
// function curry (fn) {
//     return function curriedFn(...args){
//         if(args.length<fn.length) {
//             return function () {
//                 return curriedFn(...args.concat(Array.from(arguments)))
//             }
//         }
//         return fn(...args)
//     }
// }
// function getData(gender, age) {
//     console.log('gender', gender)
//     console.log('age', age)
// }
// let curried = curry(getData)
// console.log(curried('female')(18))


// 可缓存函数 只执行一次的函数
function getSalary (base) {
    return function(merits) {
        return base + merits
    }
}
const level1 = getSalary(10000)
const level2 = getSalary(20000)
console.log(level1(3000))

// 函数curry化、防抖、节流、深克隆、出入栈匹配括号、简单版的动态规划、大数相加或相乘、对于一个给定的数据结构转成树形结构
// url参数解析、一些排序算法、二叉树遍历相关的