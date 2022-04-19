// ## 函数式编程和JS异步编程、手写Promise的练习题

// ### 一、简答题

// #### 1.谈谈你是如何理解JS异步编程的，EventLoop、消息队列都是做什么的，什么是宏任务，什么是微任务？

// ​	js的执行环境是单线程的，大部分都是同步执行的。

// 如果全部都是同步执行的话整个页面会比较慢，所以可以把一些不影响页面显示的程序去异步执行，所以这就用到了异步编程。

// EventLoop：js代码都是自上而下依次执行，有一个事件执行栈，依次把事件推入执行栈

// 消息队列：遇到异步函数类似于settimeout这种，就暂时挂起，放在消息队列中，等到上一轮的宏任务和微任务执行完成之后再执行这一轮

// 宏任务可以理解为服务器的主线任务，微任务是宏任务执行之余附带的任务。常见的微任务有promise.then，node中的nexttick等等。


// // 稍微好点的回答
// JS异步编程：Javascript的执行环境是单线程的，一次只能执行一个任务，多任务需要排队等候，这种模式可能阻塞代码，导致执行效率低下。为了避免这个问题，出现异步编程。
// 一般是通过callback回调函数，promise，事件的发布/订阅等来组织代码，本质都是通过回调函数来实现异步代码的存放和执行


// EventLoop、消息队列
// EventLoop是一种循环机制，不断去轮询一些队列，从中找到需要执行的任务并按顺序执行的一个执行模型。
// 消息队列是用来存放宏任务的队列，比如定时器的时间到了，当前定时时间内传入的方法引用会存到该队列

// 一开始整个脚本作为一个宏任务执行。执行过程中同步代码直接执行，宏任务等待时间到达或者成功之后，将方法的回调放入宏任务队列中，微任务进入微任务队列
// 当前主线程的宏任务执行完出队，然后再check是否有未执行的微任务并执行完成。接着执行浏览器UI线程的渲染工作，检查web worker任务，有则执行


// 宏任务和微任务
// 宏任务可以理解为每次执行栈执行的，即每次从事件队列中获取一个时间回调并放到执行栈中执行
// 一个宏任务执行结束之后，页面会先渲染接着在执行下一个宏任务
// 宏任务：script整体代码，setTimeout，setInterval，I/O，UI交互事件，MessageChannel等

// 微任务可以理解是在当前任务执行结束后需要立即执行的任务。也就是说，在当前任务后，在渲染之前，执行清空微任务。所以它的响应速度相比宏任务会更快，因为无需等待 UI 渲染。

// 微任务包含：Promise.then、MutaionObserver、process.nextTick(Node.js 环境)等



// ### 二、代码题


// // 将下面的异步代码使用Promise的方式改进-
// setTimeout(function() {
//     var a = 'hello'
//     setTimeout(function() {
//         var b = 'lagou'
//         setTimeout(function() {
//             var c = 'I ❤️ U'
//             console.log(a + b + c)
//         }, 5000);
//     }, 10);
// }, 10);

// // 自我思考版，感觉绕来绕去的  不知道是不是自己想复杂了，因为setTimeout里面的异步在then方法里面是获取不到值的，所以用all方法可以依次执行
// let p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         var a = 'hello'
//         resolve(a)
//     }, 10);
// })
// let p2 = p1.then((val)=>{
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             var b = 'lagou'
//             resolve(val + b)
//         }, 10);
//     })  
// })

// let p3 = p2.then(val=>{
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             var c = 'I ❤️ U'
//             resolve(val + c)
//         }, 5000);
//     })
    
// })
// Promise.all([p1, p2, p3]).then((val)=>{
//     console.log('res', val[2])
// })

// // 我靠，果然是我想的太复杂，题目及其简单其实就是用promise代替settimeout而已，不知道我脑子里绕这么多弯做什么,重写
// // ------------
// let p = new Promise((resolve, reject)=> {
//     var a = 'hello'
//     resolve(a)
// })
// p.then(val=>{
//     var b = 'lagou'
//     return val+b
// }).then(val=>{
//     var c = 'I ❤️ U'
//     console.log(val + c)
// })
// // ------------
// async function getData(){
//     let p1 = await Promise.resolve('hello')
//     let p2 = await Promise.resolve('lagou')
//     let p3 = await Promise.resolve('I ❤️ U')
//     console.log(p1+p2+p3+'hahahah')
// }
// getData()
// // ------------



// 基于以下代码完后才能下面的四个练习
const { first, last, prop } = require('lodash/fp')
const fp = require('lodash/fp')
// 数据：horsepower 马力，dollar_value 价格，in_stock 库存
const cars = [
    { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
    { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
    { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
    { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
    { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true },
    { name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false }
]
// 练习1：使用组合函数 fp.flowRight() 重新实现下面这个函数
let isLastInStock = function(cars){
    // 获取最后一条数据
    let last_car = fp.last(cars)
    // 获取最后一条数据的 in_stock 属性值
    return fp.prop('in_stock', last_car)
}
// ----------
let isLastInStock = fp.flowRight(prop('in_stock'), last)
console.log(isLastInStock(cars))
// ----------

// 练习2：使用 fp.flowRight()、fp.prop() 和 fp.first() 获取第一个 car 的 name
let isLastInStock = fp.flowRight(prop('name'), first)
console.log(isLastInStock(cars))

// 练习3：使用帮助函数 _average 重构 averageDollarValue，使用函数组合的方式实现
let _average = function(xs){
    return fp.reduce(fp.add, 0, xs) / xs.length
} // 无需改动
let averageDollarValue = function (cars){
    let dollar_values = fp.map(function(car){
        return car.dollar_value
    }, cars)
    return _average(dollar_values)
}
console.log(averageDollarValue(cars))
// ----------没懂，但应该是考函数组合的知识点，因为对fp函数的一些语法不太熟悉，就不纠结了
const total = cars=>fp.map(cars=>cars.dollar_value,cars)
const fn = fp.flowRight(_average,total);
console.log(fn(cars))
// ----------

// 练习4：使用 flowRight 写一个 sanitizeNames() 函数，返回一个下划线连续的小写字符串，把数组中的 name 转换为这种形式，例如：sanitizeNames(["Hello World"]) => ["hello_world"]
let _underscore = fp.replace(/\W+/g, '_') // 无须改动，并在 sanitizeNames 中使用它
// function split1(val){
//     return val.split(' ')
// }
let sanitizeNames = fp.flowRight(fp.map(_underscore),fp.map(fp.toLower),fp.map((car) => car.name))
console.log(sanitizeNames(cars))



// 基于下面提供的代码，完成后续的四个练习
// support.js
class Container {
    static of(value){
        return new Container(value)
    }
    constructor(value){
        this._value = value
    }
    map(fn){
        return Container.of(fn(this._value))
    }
}

class Maybe {
    static of(x){
        return new Maybe(x)
    }
    isNothing(){
        return this._value === null || this._value === undefined
    }
    constructor(x){
        this._value = x
    }
    map(fn){
        return this.isNothing() ? this : Maybe.of(fn(this._value))
    }
}
const fp = require('lodash/fp')
// 练习1：使用 fp.add(x, y) 和 fp.map(f,x) 创建一个能让 functor 里的值增加的函数 ex1
let maybe = Maybe.of([5,6,11])
// 思路： 函子对象的 map 方法可以运行一个函数对值进行处理，函数的参数为传入 of 方法的参数；接着对传入的整个数组进行遍历，并对每一项执行 fp.add 方法
let ex1 = maybe.map(e => fp.map(fp.add(2), e) )
console.log(ex1)

// 练习2：实现一个函数 ex2，能够使用 fp.first 获取列表的第一个元素
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = xs.map(e=>{ fp.first(e)} )
console.log(ex2._value)

// 练习3：实现一个函数 ex3，使用 safeProp 和 fp.first 找到 user 的名字的首字母
let safeProp = fp.curry(function(x, o){
    return Maybe.of(o[x])
})
let user = { id: 2, name: 'Albert' }
// let ex3 = fp.flowRight(fp.map(i => fp.first(i)), safeProp('name'))
// let ex3 = fp.first(safeProp('name', user)._value)
let ex3 = safeProp('name', user).map(x => fp.first(x))
console.log(ex3)

// 练习4：使用 Maybe 重写 ex4，不要有 if 语句
let ex4 = function(n){
    if(n){
        return parseInt(n)
    }
}
// let ex4 = Maybe.of(34.24).map(e=>parseInt(e))
let ex4 = (value)=>{ return Maybe.of(value).map(e=>parseInt(e)) }
console.log(ex4(78.87))


// 四、手写实现 MyPromise 源码
// 要求：尽可能还原 Promise 中的每一个 API，并通过注释的方式描述思路和原理。
/**
 * 1. 是个构造函数
 * 2. 传入一个可执行函数 函数的入参第一个为 fullFill函数 第二个为 reject函数；  函数立即执行，  参数函数异步执行
 * 3. 状态一旦更改就不可以变更  只能 pending => fulfilled 或者  pending => rejected
 * 4. then 的时候要处理入参的情况 successCallback 和failCallback 均可能为非函数
 *      默认的 failCallback 一定要将异常抛出， 这样下一个promise便可将其捕获 异常冒泡的目的
 * 5. then 中执行回调的时候要捕获异常 将其传给下一个promise
 *    如果promise状态未变更 则将回调方法添加到对应队列中
 *    如果promise状态已经变更 需要异步处理成功或者失败回调
 *    因为可能出现 回调结果和当前then返回的Promise一致 从而导致死循环问题
 * 6. catch只是then的一种特殊的写法 方便理解和使用
 * 7. finally 特点 1. 不过resolve或者reject都会执行
 *                2. 回调没有参数
 *                3. 返回一个Promise 且值可以穿透到下一个then或者catch
 * 8. Promise.resolve, Promise.reject 根据其参数返回对应的值 或者状态的Promise即可
 * 9. Proise.all 特点  1. 返回一个Promise
 *                    2. 入参是数组 resolve的情况下出参也是数组 且结果顺序和调用顺序一致
 *                    3. 所有的值或者promise都完成才能resolve 所有要计数
 *                    4. 只要有一个为reject 返回的Promise便reject
 * 10. Proise.race 特点 1. 返回一个Promise
 *                    2. 入参是数组 那么出参根据第一个成功或者失败的参数来确定
 *                    3. 只要有一个resolve 或者reject 便更改返回Promise的状态
 *
 *
 */
 const PENDING = 'pending'; // 等待
const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败

class MyPromise {
  constructor (executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e);
    }
  }
  // promsie 状态 
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败后的原因
  reason = undefined;
  // 成功回调
  successCallback = [];
  // 失败回调
  failCallback = [];

  resolve = value => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status !== PENDING) return;
    // 将状态更改为成功
    this.status = FULFILLED;
    // 保存成功之后的值
    this.value = value;
    // 判断成功回调是否存在 如果存在 调用
    // this.successCallback && this.successCallback(this.value);
    while(this.successCallback.length) this.successCallback.shift()()
  }
  reject = reason => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status !== PENDING) return;
    // 将状态更改为失败
    this.status = REJECTED;
    // 保存失败后的原因
    this.reason = reason;
    // 判断失败回调是否存在 如果存在 调用
    // this.failCallback && this.failCallback(this.reason);
    while(this.failCallback.length) this.failCallback.shift()()
  }
  then (successCallback, failCallback) {
    // 参数可选
    successCallback = successCallback ? successCallback : value => value;
    // 参数可选
    failCallback = failCallback ? failCallback: reason => { throw reason };
    let promsie2 = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = successCallback(this.value);
            // 判断 x 的值是普通值还是promise对象
            // 如果是普通值 直接调用resolve 
            // 如果是promise对象 查看promsie对象返回的结果 
            // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
            resolvePromise(promsie2, x, resolve, reject)
          }catch (e) {
            reject(e);
          }
        }, 0)
      }else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason);
            // 判断 x 的值是普通值还是promise对象
            // 如果是普通值 直接调用resolve 
            // 如果是promise对象 查看promsie对象返回的结果 
            // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
            resolvePromise(promsie2, x, resolve, reject)
          }catch (e) {
            reject(e);
          }
        }, 0)
      } else {
        // 等待
        // 将成功回调和失败回调存储起来
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.value);
              // 判断 x 的值是普通值还是promise对象
              // 如果是普通值 直接调用resolve 
              // 如果是promise对象 查看promsie对象返回的结果 
              // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
              resolvePromise(promsie2, x, resolve, reject)
            }catch (e) {
              reject(e);
            }
          }, 0)
        });
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let x = failCallback(this.reason);
              // 判断 x 的值是普通值还是promise对象
              // 如果是普通值 直接调用resolve 
              // 如果是promise对象 查看promsie对象返回的结果 
              // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
              resolvePromise(promsie2, x, resolve, reject)
            }catch (e) {
              reject(e);
            }
          }, 0)
        });
      }
    });
    return promsie2;
  }
  finally (callback) {
    return this.then(value => {
      return MyPromise.resolve(callback()).then(() => value);
    }, reason => {
      return MyPromise.resolve(callback()).then(() => { throw reason })
    })
  }
  catch (failCallback) {
    return this.then(undefined, failCallback)
  }
  static all (array) {
    let result = [];
    let index = 0;
    return new MyPromise((resolve, reject) => {
      function addData (key, value) {
        result[key] = value;
        index++
        if (index === array.length) resolve(result)  
      }
      for (let i = 0; i < array.length; i++) {
        let current = array[i];
        console.log(current)
        if (current instanceof MyPromise) {
          // promise 对象
          current.then(value => addData(i, value), reason => reject(reason))
        }else {
          // 普通值
          addData(i, array[i]);
        }
      }
    })
  }
//   * 10. Proise.race 特点 1. 返回一个Promise
//   *                      2. 入参是数组 那么出参根据第一个成功或者失败的参数来确定
//   *                      3. 只要有一个resolve 或者reject 便更改返回Promise的状态
  static race (arr) {
      return new MyPromise((resolve, reject) => {
          for(var i=0; i<arr.length; i++) {
              let current = arr[i]
              if (current instanceof MyPromise) {
                // // promise 对象
                current.then(value => resolve(value), reason => reject(reason))
              }else {
                // 普通值
                resolve(current)
              }
          }
      })
  }
  static resolve (value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value));
  }
}

function resolvePromise (promsie2, x, resolve, reject) {
  if (promsie2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if (x instanceof MyPromise) {
    // promise 对象
    // x.then(value => resolve(value), reason => reject(reason));
    x.then(resolve, reject);
  } else {
    // 普通值
    resolve(x);
  }
}

 let p1 = function(){
     return new MyPromise((resolve, reject) => {
         setTimeout(() => {
            resolve('success-p1')
         }, 100);     
     })
 } 
 let p2 = function(){
    return new MyPromise((resolve, reject) => {
        resolve('success-p2')
     })
 }
 let p3 = function(){
    return new MyPromise((resolve, reject) => {
        resolve('success-p3')
     })
 }
 
 MyPromise.race([p1(), p2(), p3()]).then((res)=>{
    console.log(res)
})