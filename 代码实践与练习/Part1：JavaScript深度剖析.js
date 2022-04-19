/*
// 函数式编程

// //  -------------- 高阶函数 ------------------
// // 自主实现filter
// function filter (arr, fn) {
//     let result = []
//     for(let i=0; i<arr.length; i++) {
//         if(fn(arr[i])) {
//             result.push(arr[i])
//         }
//     }
//     return result
// }
// console.log(filter([1,2,3,4,5,6,7], (e)=>{return e%2 === 0}))
// // 实现一个once函数 只执行一次
// function once (fn) {
//     let done = true
//     return function() {
//         if(true) {
//             if(done) {
//                 done = false
//                 return fn.apply(this, arguments)
//             }
//         }    
//     }  
// } 
// let pay = once((money)=> {
//     console.log('支付了' + money + '元')
// })
// pay(3)
// pay(5)
// pay(6)
// pay(8)

// // every
// function every(arr,fn) {
//     for(var i=0; i<arr.length; i++) {
//         if(!fn(arr[i])) {
//             return false
//             // break
//         }
//     }
//     return true
// }
// console.log(every([1,2,3,4,5], (i)=>{return i<=10}))
// // map
// function map(arr, fn) {
//     let result = []
//     for(var i=0; i<arr.length; i++) {
//         result.push(fn(arr[i]))
//     }
//     return result
// }
// console.log(map([1,2,3,4,5,9], (i)=>{return i*3}))
// //  -------------- 高阶函数 ------------------



// //  -------------- 闭包 ------------------
// // N的N次方
// // console.log(Math.pow(4, 2))
// function makePower (power) {
//     return function(num) {
//         return Math.pow(num, power)
//     }
// }
// const fn2 = makePower(2)
// const fn3 = makePower(3)
// console.log(fn2(3))
// console.log(fn3(2))

// // 求员工工资，不同级别的工资和绩效工资不同
// // getSalary(10000, 2000)
// // getSalary(12000, 3000)
// // getSalary(15000, 4000)
// function getSalary (base) {
//     return function(merits) {
//         return base + merits
//     }
// }
// const level1 = getSalary(10000)
// const level2 = getSalary(20000)
// console.log(level1(3000))
// //  -------------- 闭包 ------------------



// //  -------------- 纯函数 ------------------
// // 记忆函数  模拟lodash中的memoize方法的实现
// function memorize (fn) {
//     let cache = {}
//     return function(){
//         let code = JSON.stringify(arguments)
//         cache[code] = cache[code] || fn.apply(fn, arguments)
//         return cache[code]
//         // return fn.apply(fn, arguments)
//     }
// }
// let getResult = memorize(function(x, y){
//     console.log(999999)
//     return x*y*2
// })
// console.log(getResult(5, 8))
// console.log(getResult(5, 8))
// console.log(getResult(5, 8))

// //  -------------- 纯函数 ------------------



// //  -------------- 柯里化 ------------------
// // 使用柯里化来解决硬编码的问题
// function checkAge (min, age) {
//     return min<=age
// }
// // console.log(checkAge(18, 25))

// // 函数的柯里化-闭包
// function checkAge2 (min) {
//     return function(age) {
//         return min>=age
//     }
// }
// // 函数的柯里化-es6
// let checkAge3 = min=>  age => min>=age
// let teenager = checkAge3(18)
// console.log(teenager(16))

// // 模拟lodash中的柯里化函数  curry
// // 功能： 创建一个函数，该函数接受一个或多个func的参数，
// // 如果func所需要的参数都被提供则执行func，并返回执行的结果，否则继续返回该函数并等待接受剩余参数。
// // 参数：需要柯里化的函数，返回值：柯里化后的函数
// function getSum (a, b, c, d) {
//     console.log(a+b+c+d)
//     return a+b+c+d
// }
// // getSum(1, 2, 3, 4)
// function curry (func) {
//     return function curriedFn (...args) {
//         // 形参与实参个数做比较
//         if(args.length < func.length) {
//             return function () {
//                 // 等待参数传递完成后，把参数合并再执行返回函数
//                 return curriedFn(...args.concat(Array.from(arguments)))
//             }          
//         }
//         return func(...args)
//     }   
// }
// let curried = curry(getSum)
// console.log(curried(1,2)(3,4))
// //  -------------- 柯里化 ------------------



// -------------- 函数组合概念 ------------------
// 函数组合演示
// function compose (f1, f2) {
//     return function (e) {
//       return f1(f2(e))
//     }
// }
// function reverse(arr) {
//     return arr.reverse()
// }
// function first (arr) {
//     return arr[0]
// }
// let myCom = compose(first, reverse)
// console.log(myCom([1,3,4,5]))

// 模拟lodash中的组合函数
// function composition (...args) {
//     return function(value) {
//         return args.reverse().reduce((x,y) => { return y(x) }, value)
//     }
// }
// 箭头函数优化
// const composition = (...args) => value => args.reverse().reduce((x,y)=>  y(x), value)
// // 加一个操作函数
// function toUpper(arr) {
//     return arr.toUpperCase()
// }
// const f = composition(toUpper,first,reverse)
// console.log(f(['this', 'is', 'me']))

// // 结合律
// const a = composition(toUpper,composition(first,reverse))
// // const b = composition(composition(toUpper,first),reverse)
// console.log(a(['this', 'is', 'me']))

// 单个函数的调试方案

// PointFree-案例
// 把一个字符串中的首字母提取并转换成大写，使用.作为分隔符。world wild web ===> W.W.W
// 普通写法
// function findFirst (value) {
//     let arr = value.split(' ')
//     let result = []
//     arr.forEach(element => {
//         result.push(element.slice(0,1))
//     })
//     console.log(result.join('.'))
// }
// findFirst('world wild web')
// // Point Free概念写法
// function _split(value) {
//     return value.split(' ')
// }
// function _first(value) {
//     let result = []
//     value.forEach(element => {
//         result.push(element.slice(0,1))
//     })
//     return result
// }
// function _join(value) {
//     return value.join('.')
// }
// function log (value) {
//     console.log(value)
//     return value
// }
// let logFn = curry((tag, value)=>{
//     console.log(tag, value)
//     return value
// })
// const splitFirstJoin = composition(curry(_join),logFn('tag2'),curry(_first),logFn('tag1'),curry(_split))
// console.log(splitFirstJoin('world wild web'))

// -------------- 函数组合概念 ------------------



// -------------- 函子 ------------------
// es6中的class是js原型继承的一种语法糖。js中的class就是一种特殊的function
// class与function的相同和异同点
// class Container {
//     constructor (value) {
//         this._value = value
//     }
//     map (fn) {
//         return new Container(fn(this._value))
//     }
// }
// let r = new Container(4)
// console.log(r.map(x => x + 1).map(x => x * x))
// 对象不想每次都用new去创建，太面向对象了,用一个静态方法去new
// class Container {
//     static of (value) {
//         return new Container(value)
//     }
//     constructor (value) {
//         this._value = value
//     }
//     map (fn) {
//         return new Container(fn(this._value))
//     }
// }
// let r = Container.of(4).map(x => x + 1)
// console.log(r)

// maybe函子 错误情况
// class MayBe {
//     static of (value) {
//         return new MayBe(value)
//     }
//     constructor (value) {
//         this._value = value
//     }
//     map (fn) {
//         return this.unRegu() ? MayBe.of(null) : MayBe.of(fn(this._value))
//     }
//     unRegu () {
//         return this._value === null || this._value === undefined
//     }
// }
// // {'length': 7}
// let isIf = MayBe.of(undefined).map(x=> x.length).map(x => null)
// console.log(isIf)

// // either函子 错误处理
// class left {
//     static of(value) {
//         return new left(value)
//     }
//     constructor (value) {
//         this._value = value
//     }
//     map (fn) {
//         // 嵌入错误消息
//         return this
//     }
// }
// class right {
//     static of(value) {
//         return new right(value)
//     }
//     constructor (value) {
//         this._value = value
//     }
//     map (fn) {
//         return right.of(fn(this._value))
//     }
// }
// // let r = right.of(6).map(x=>x*x)
// // let l = left.of(6).map(x=>x*x)
// // console.log(l,r)
// function parseJson (str) {
//     try {
//         return right.of(JSON.parse(str))
//     } catch (error) {
//         return left.of({error: error.message})
//     }
// }
// let r = parseJson('767').map(x => x + 1)
// console.log(r)

// // IO函子
// const composition = (...args) => value => args.reverse().reduce((x,y)=>  y(x), value)  //组合函数
// class IO {
//     static of(value) {
//         return new IO(function () {
//             // 把取值过程包装在函数中，需要值得时候再调用函数取值
//             return value
//         })
//     }
//     constructor (fn) {
//         this._value = fn
//     }
//     map (fn) {
//         // 需要把当前函子的value和传入的函数组合成一个新的函数
//         return new IO(composition(fn, this._value))
//     }
// }
// // 调用
// // let r = IO.of(process).map( p => p.execPath)
// // console.log(r._value())
// const fs = require('fs')

// // IO函子的问题
// let readFile = function(filename) {
//     return new IO(function(){
//         return fs.readFileSync(filename, 'utf-8')
//     })
// }
// let print = function(x) {
//     return new IO(function(){
//         console.log(x)
//         return x
//     })
// }
// let cat = composition(print, readFile)
// // 嵌套函子的函数，调用的时候不方便._value()._value(), api风格累赘，可用Monad函子来改进
// let m = cat('index.html')._value()._value()
// console.log(m)

// // folktale
// const { compose, curry } = require('folktale/core/lambda')
// const { toUpper, first } = require('lodash/fp')
// // 第一个参数是传入的参数个数
// let f = curry(2, (x, y)=> x+y)
// console.log(f(1, 2), f(1)(2))
// // compose
// let c = compose(toUpper, first)
// console.log(c(['first', 'second']))

// // folktale中的Task函子怎么处理异步任务
// const { task } = require('folktale/concurrency/task')
// const fs = require('fs')
// const {split, find} = require('lodash/fp')
// function readFile (filename) {
//     return task(resolver => {
//         fs.readFile(filename, 'utf-8', (err, data)=> {
//             if(err) {
//                 resolver.reject(err)
//             } 
//             resolver.resolve(data)
//         })
//     })
// }
// readFile('index.html')
//         .map(split('\n'))
//         .map(find(x => x.includes('html')))
//         .run()
//         .listen({
//             onRejected:err=>{ console.log(err)},
//             onResolved: value => {
//                 console.log(value)
//             }
//         })

// // Pointed函子 实现了of静态方法  一个概念
// class Pointed {
//     static of(value) {
//         return new Pointed(value)
//     } 
//     constructor (value) {
//         this._value = value
//     }
//     map (fn) {
//         return Pointed.of(fn(this._value))
//     }
// }
// const p = Pointed.of(9)
//         .map(x=>x+1)
// console.log(p)

// Monad函子
// const fs = require('fs')
// const composition = (...args) => value => args.reverse().reduce((x,y)=>  y(x), value)  //组合函数
// class IO {
//     static of(value) {
//         return new IO(function () {
//             // 把取值过程包装在函数中，需要值得时候再调用函数取值
//             return value
//         })
//     }
//     constructor (fn) {
//         this._value = fn
//     }
//     map (fn) {
//         // 需要把当前函子的value和传入的函数组合成一个新的函数
//         return new IO(composition(fn, this._value))
//     }
//     join () {
//         return this._value()
//     }
//     flatMap (fn) {
//         return this.map(fn).join()
//     }
// }
// let readFile = function(filename) {
//     return new IO(function(){
//         return fs.readFileSync(filename, 'utf-8')
//     })
// }
// let print = function(x) {
//     return new IO(function(){
//         console.log(x)
//         return x
//     })
// }
// let cat = readFile('index.html')
//             .flatMap(print)
//             .join()
// console.log(cat)
*/

const { timeStamp } = require("console")
const { reject } = require("lodash")


/*
// 异步编程
// promise
// const promise = new Promise((resolve, reject) => {
//     // resolve(50)
//     reject(new Error('error了喔'))
// })
// promise.then((data) => {
//     console.log(data)
// }).catch((e)=>{
//     console.log('错误信息', e)
// })

// // promise封装ajax
// function ajax(url) {
//     return new Promise((resolve, reject)=>{
//         var xhr = new XMLHttpRequest()
//         xhr.open('get', url)
//         xhr.responseType = 'json'
//         xhr.onload = ()=>{
//             if(this.status === 200) {
//                 resolve(this.message)
//             } else {
//                 reject(new Error(this.statusText))
//             }
//         } 
//         xhr.send()
//     })
// }
// ajax('test.json').then((value)=>{
//     console.log(value)
// }, (e)=>{
//     console.log('error', e)
// })

// unhandledRejection 捕获未手动捕获的异常
// 不推荐，应该在代码中明确捕获每一个可能的异常
// window.addEventListener('unhandledRejection', e => {})
// process.on('unhandledRejection', (reason, promise) => {
//     console.log(reason, promise)
//     // reason => Promise 失败原因，一般是个错误对象
//     // promise => 出现异常的Promise对象
// })

// promise静态方法
// let p = new Promise((resolve, reject)=>{
//     resolve(67)
// })
// let p = Promise.resolve(3)
// let p = Promise.reject('reject')
// p.then((data)=>{
//   console.log(data+4)
// }).catch(e=>{
//     console.log('error:', e)
// })
// 如果传入的是一个对象，并且这个对象也有一个和promise一样的then方法，也能作为promise
// thenable方法。如果需要把第三方的promise对象转换成原生的promise对象可以以这种方式
// Promise.resolve({
//     then: (onFulfilled, onRejected) =>{
//         onFulfilled(3)
//     }
// })
// .then((data)=>{
//     console.log(data+3)
// })

// promise并行执行多个异步任务
// all等待所有的任务结束之后结束，返回数组；race第一个任务结束则结束，返回第一个完成的任务的值;finally方法用于指定不管Promise对象最后状态如何，都会执行的操作
// let p1 = Promise.resolve(1)
// let p2 = Promise.resolve(24)
// let p3 = Promise.resolve(3535)
// let allP =Promise.all([p1, p2, p3])
// allP.then((e)=>{
//     console.log(e)
// })

// 宏任务和微任务
// promise的回调会作为微任务执行
// 微任务是为了提高整体的响应能力 eg:Promise & MutationObserver & process.nextTick
// 大部分异步调用的api都是作为宏任务执行的 

// 增强链式调用的可读性
// Generate生成器处理异步任务  ES2015  co库
// function * foo () {
//     console.log('start')
//     const res = yield 'foo'
//     console.log(res)
// }
// const generator = foo()
// generator.next()
// console.log(generator.next(123))
// generator.throw(new Error('error'))
// 更优异步方案 异步调用更加扁平化
// function * foo() {
//     console.log('start')
//     yield ajax('user.json')
//     yield ajax('user2.json')
//     // ...
// }
// const g = foo()
// const res = g.next()
// console.log(res)
// 处理逻辑，可使用递归优化
// res.value.then((data => {
//     const res2 = g.next(data)
//     res2.value.then((data) => {
//         const res3 = g.next(data)
//         // ...
//     })
// }))

// function co (generator) {
//     const g = generator
//     function handleResult (result) {
//         if (result.done) return // 生成器函数结束
//         result.value.then(data=> {
//              handleResult(g.next(data))
//         }, error => {
//             g.throw(error)
//         })
//      }
//     handleResult(g.next())
// }
// co(foo)
// Async/Await 语法糖  最方便~ 
*/


// 手写promise源码

/*
    一、初始化版本
    1.Promise 就是一个类  在执行这个类的时候  需要传递一个（回调函数）执行器进去   执行器立即执行
    2.Promise有三种状态  fulfilled  rejected  pending  
    3.pending -> fulfilled  rejected
    resolve和reject就是用来更改状态的
    状态一旦确定则不可更改
    4.then方法内部做的事情就是判断状态，如果状态成功则执行成功的回调 失败则执行失败的回调  是被定义在原型对象中的
    5.then成功之后有一个参数，表示成功后的值，失败后有一个失败原因
*/

/*
    二、加入异步逻辑  promise  里面的回调是异步的
    1.then函数中处在pending状态的回调函数的处理 成功返回成功回调 失败返回失败回调
*/

/*
    三、then方法多次调用添加多个处理函数
    1.分同步的情况和异步的情况，同步的情况不需要处理
    2.异步的情况下每一个回调函数的状态都应该存储起来  需要保证前一个函数结束后执行另一个函数  等到状态编程成功或者失败的时候再依次调用
*/

/*
    四、then方法的链式调用
    1.then方法的链式调用：每个then方法返回一个promise对象
    2.后面then方法的回调函数拿到值是上一个then方法的回调函数的返回值
    3.判断返回值x是普通值还是promise对象
      普通值： 直接调用resolve
      promise对象： 查看promise对象返回的结果
      根据promise对象返回的结果，决定调用resolve还是reject
     
*/

/*
    五、then方法链式调用识别Promise对象自返回
    1.在then方法的回调函数中，不能返回当前then方法返回的promise对象  否则会造成promise的循环调用  会报错
    2.需要判断回调函数跟当前的promise是不是相等  如果相等直接reject 

*/

/*
    六、then方法的参数变成可选参数
    1.如果then方法没有传递参数，那么就补充一个函数进来
*/

/*
    七、捕获错误以及then链式调用其他状态代码补充
    1.try-catch捕获当前Promise对象
    2.捕获then链式调用中的回调函数的错误
    
*/

/*
    八、Promise.all方法的实现  解决异步并发问题  以调用的顺序获取结果
    1.静态方法，接受数组作为参数
    2.返回的是一个Promise对象
    3.循环数组判断数组当前值是普通值 or Promise对象，普通值直接输出  Promise对象需要先执行 执行后的返回的结果放到数组中  最后输出一个结果数组
    4.注意异步操作情况，需要等待异步操作完成之后才能resolve  使用index记录返回数组的长度，如果index与数组长度不一致则等待一致后返回
*/

/*
    九、Promise.resolve方法的实现  将给定值转换成promise对象   返回值是一个promise对象  返回的promise中包裹这给定值
    1.接受的值判断当前值是普通值（用promise对象包裹） or Promise对象（原封不动返回）
    
*/

/*
    十、finally方法的实现
    1.无论promise对象成功或者失败 回调函数始终都会被执行
    2.finally方法后面的then方法可以拿到当前promise对象返回的结果
    实现：
    1.需要定义在promise的原型链中  接受一个回调函数作为参数 使用this.then方法来获取当前promise对象状态  成功和失败回调函数中调用回调函数
    2.finally方法需要返回一个promise对象  需要在then方法中拿到成功的值或者失败结果 return 或者 throw的方式传递出去
    3.注意：finally方法如果返回的是一个异步执行的函数 此时finally方法的then方法可能返回值还是上一个的结果 需要等待
            此时需要借助promise的resolve方法：接受的值判断当前值是普通值（用promise对象包裹） or Promise对象（原封不动返回）

    
*/

/*
    十一、.catch方法的实现 当前promise最终状态为失败的情况
    1.在catch方法的内部去调用then方法 成功回调传入undefined 失败的传入回调函数
    
*/

// Promise有三种状态  fulfilled  rejected  pending  
const fulfilled = 'fulfilled'
const rejected = 'rejected'
const pending = 'pending'
class myPromise {
    constructor (executor) {
        // 执行器立即执行
        // 捕获执行器错误
        try {
            executor(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }        
    }
    // promise状态
    status = pending
    // 成功的值
    _value = undefined
    // 失败的原因
    _reason = undefined
    // 成功回调 多个 每个回调函数的状态都应该存储起来
    sucessCallback = []
    // 失败回调
    failCallback = []
    // 箭头函数是考虑this指向
    resolve = (value)=> {
        // 状态一旦确定则不可更改
        if(this.status!==pending) return
        // resolve和reject就是用来更改状态的
        this.status = fulfilled
        this._value = value
        // 成功则执行成功的回调
        // this.sucessCallback && this.sucessCallback(this._value)
        while (this.sucessCallback.length) this.sucessCallback.shift()()
    }
    reject = (reason)=> {
        if(this.status!==pending) return
        this.status = rejected
        this._reason = reason
        // this.failCallback && this.failCallback(this._reason)
        while (this.failCallback.length) this.failCallback.shift()()
    }
    // 判断状态，如果状态成功则执行成功的回调 失败则执行失败的回调
    then = (sucessCallback, failCallback) => {
        sucessCallback = sucessCallback ? sucessCallback : value => value
        failCallback = failCallback ? failCallback : reason => {throw reason}
        // then方法的回调函数拿到值是上一个then方法的回调函数的返回值
        let promise2 = new myPromise((resolve, reject) => {
            // 判断状态
            if(this.status === fulfilled) {
                setTimeout(() => {
                    try {
                        let x = sucessCallback(this._value)
                        // 判断 x 的值是普通值还是promise对象
                        // 如果是普通值 直接调用resolve 
                        // 如果是promise对象 查看promsie对象返回的结果 
                        // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
                        resolvePromise(promise2, x, resolve, reject)
                    }catch (e) {
                    reject(e);
                    }
                }, 0)
                // // 为了把promise执行完成之后再执行里面的代码
                // setTimeout(() => {
                //      // 成功之后有一个参数
                //     let x = sucessCallback(this._value)
                //     // resolve(x)
                //     // 判断返回值类型，并做相应处理
                //     resolvePromise(promise2, x, resolve, reject)
                // }, 0);              
            } else if (this.status === rejected) {
                setTimeout(() => {
                    try {
                      let x = failCallback(this._reason);
                      // 判断 x 的值是普通值还是promise对象
                      // 如果是普通值 直接调用resolve 
                      // 如果是promise对象 查看promsie对象返回的结果 
                      // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
                      resolvePromise(promise2, x, resolve, reject)
                    }catch (e) {
                      reject(e);
                    }
                  }, 0)
            } else {
                // 异步逻辑  等待
                // 将成功回调和失败回调存储起来
                // this.sucessCallback.push(sucessCallback)
                // this.failCallback.push(failCallback)
                this.sucessCallback.push(() => {
                    setTimeout(() => {
                      try {
                        let x = sucessCallback(this._value);
                        resolvePromise(promise2, x, resolve, reject)
                      }catch (e) {
                        reject(e);
                      }
                    }, 0)
                  })
                  this.failCallback.push(() => {
                    setTimeout(() => {
                      try {
                        let x = failCallback(this._reason)
                        resolvePromise(promise2, x, resolve, reject)
                      }catch (e) {
                        reject(e);
                      }
                    }, 0)
                  })
            }
        })
        return promise2
    }
    static all (arr) {
        let res = []
        let index = 0
        return new myPromise((resolve, reject)=>{
            function addData(key, value) {
                res[key] = value
                index++
                if(index === arr.length) resolve(res)  
            }
            for(let i=0;i<arr.length;i++){
                let current = arr[i]
                if(current instanceof myPromise) {
                    // Promise对象
                    current.then(value=>{
                        addData(i, value)
                    },reason=>{reject(reason)})
                } else {
                    // 普通值 直接push进去数组
                    addData(i, arr[i])
                }
            }       
        })
    }
    static resolve (val) {
        if(val instanceof myPromise) return val
        return new myPromise(resolve=>resolve(val))
    }
    finally (callback){
        return this.then((val)=>{
           return myPromise.resolve(callback()).then(()=> val)
            // callback(val)
            // return val
        },reason=>{
          return  myPromise.resolve(callback()).then(()=> {throw reason})
            // callback(reason)
            // return reason
        })
        // return new myPromise(resolve=>resolve())
    }
    catch (callback) {
        // 1.在catch方法的内部去调用then方法 成功回调传入undefined 失败的传入回调函数
        // return this.then(undefined, callback)
        return this.then(()=>{
            return undefined
        }, reason=>{
            callback(reason)
        })
    }
}
function resolvePromise (promise2, x, resolve, reject) {
    if(promise2 === x) {
        return x.reject(new TypeError('循环调用了'))
    }
    if(x instanceof myPromise) {
        // 根据promise对象返回的结果，决定调用resolve还是reject
        // x.then(value => resolve(value), reason => reject(reason))
        x.then(resolve, reject)
    } else {
        resolve(x)
    }
}

// // 模拟下面的方法的实现
// let promise = new myPromise((resolve, reject)=> {
//     // throw new Error('错误了')
//     // 初始版本
//     setTimeout(() => {
//         resolve(12)
//     }, 2000);  
//     // 添加异步逻辑
//     // setTimeout(() => {
//     //     resolve(12)
//     // }, 1000); 
//     // reject('错了')
// })
// 6
// promise.then()
// .then()
// .then((value)=>{
//     // console.log('连续几个空then后打印的value', value)
//     // throw new Error('then error')
//     // setTimeout(()=>{
//         return value
//     // },2000) 
// }, (reason)=>{
//     console.log(reason)
// }).then(value=>{
//     console.log('hjhjk',value)
// },reason=>{
//     console.log(reason)
// })
// promise.then((data) => {
//     console.log(data)
// }, (reason)=>{
//     console.log(reason)
// })

// promise.then((data) => {  
//     setTimeout(()=>{
//         console.log(data + 1)
//     }, 2000)
    
// }, (reason)=>{
//     console.log(reason)
// })
// promise.then((data) => {
//     setTimeout(()=>{
//         console.log(data + "hdh") 
//     }, 1000)  
// }, (reason)=>{
//     console.log(reason)
// })

// promise.then((data) => {
//     console.log(data)
//     // 返回普通值
//     // return data
//     return other()
// }, (reason)=>{
//     console.log(reason)
// }).then((data) => {
//     console.log('data', data+1)
// })

// 5
// function other () {
//     return new myPromise((resolve, reject) => {
//         resolve('other')
//     })
// }

// let p1 = promise.then(value=>{
//     console.log(1111, value)
//     return p1
// })
// p1.then(value => {
//     console.log(value)
// }, reson=>{
//     console.log(reson)
// })

// // Promise.all方法的实现
function P1(){
    return new myPromise((resolve, reject) => {
        setTimeout(() => {
            reject('p1')
        }, 2000);
    })
}
function P2(){
    return new myPromise((resolve, reject) => {
        resolve('p2')
    })
}
// myPromise.all([P1(), P2(),'haha']).then((res)=>{
//     console.log(res)
// })

P2().finally(()=>{
    console.log('finally')
    return P1()
}).catch(e=>{
    console.log(e)
})
// then(value =>console.log(value), reason=> console.log(reason))
// myPromise.resolve(P1()).then(value => console.log(value))