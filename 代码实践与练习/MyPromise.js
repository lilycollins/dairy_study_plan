
// // Promise有三种状态  fulfilled  rejected  pending  
// const FULFILLED = 'fulfulled'
// const REJECT = 'reject'
// const PENDING = 'pending'
// // Promise 就是一个类
// class myPromise{
//     // 在执行这个类的时候  需要传递一个（回调函数）执行器进去
//     constructor(executor) {
//         // 执行器立即执行
//         executor(this.resolve, this.reject)
//     }
//     status = PENDING
//     successCallback = undefined
//     failCallback = undefined
//     value = undefined
//     reason = undefined
//     resolve = (value => {
//         // 状态一旦确定则不可更改
//         if(this.status !== PENDING) return
//         // resolve和reject就是用来更改状态的
//         this.status = FULFILLED
//         this.value = value
//     })
//     reject = (reason => {
//         // 状态一旦确定则不可更改
//         if(this.status !== PENDING) return
//         // resolve和reject就是用来更改状态的
//         this.status = REJECT
//         this.reason = reason
//     })
//     then = ((sucessCallback, failCallback) => {
//         // then方法内部做的事情就是判断状态，被定义在原型对象中的
//         if(this.status === FULFILLED) {
//             // 状态成功则执行成功的回调,传入成功后的值
//             sucessCallback(this.value)
//         } else if (this.status === REJECT) {
//             // 状态失败则执行失败的回调，传入失败后的原因
//             failCallback(this.reason)
//         } else {
//             // 等待  将成功回调和失败回调存储起来
//             this.successCallback = sucessCallback
//             this.failCallback = failCallback
//         }
//     })
// }
// // 二、加入异步逻辑  promise  里面的回调是异步的
// // 1.then函数中处在pending状态的回调函数的处理 成功返回成功回调 失败返回失败回调
// // 测试
// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(7)
//     }, 2000);
//     // reject('cuole')
// }).then((value)=>{
//     console.log(value)
// },reason=>{
//     console.log(reason)
// })

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
// 模拟下面的方法的实现
let promise = new MyPromise((resolve, reject)=> {
    // throw new Error('错误了')
    // 初始版本
    setTimeout(() => {
        resolve(12)
    }, 2000);  
    // 添加异步逻辑
    // setTimeout(() => {
    //     resolve(12)
    // }, 1000); 
    // reject('错了')
})
6
promise.then()
.then()
.then((value)=>{
    // console.log('连续几个空then后打印的value', value)
    // throw new Error('then error')
    // setTimeout(()=>{
        return value
    // },2000) 
}, (reason)=>{
    console.log(reason)
}).then(value=>{
    console.log('hjhjk',value)
},reason=>{
    console.log(reason)
})
promise.then((data) => {
    console.log(data)
}, (reason)=>{
    console.log(reason)
})