// 只出现一次的数字
// 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
// 说明：
// 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
// 示例 1:
// 输入: [2,2,1]
// 输出: 1
// 示例 2:
// 输入: [4,1,2,1,2]
// 输出: 4
// var singleNumber = function(nums) {
//   // 普通解法
//   // if(nums.length === 1) { return nums[0] }
//   // for(let i=0; i<nums.length; i++) {
//   //   if(nums.indexOf(nums[i]) === nums.lastIndexOf(nums[i])) {
//   //     return nums[i]
//   //   }
//   // }
//   // 巧妙解法
//   let arr = [...new Set(nums)]
//   let res = arr.reduce((a, b) => { return a+b }, 0)
//   let res2 = nums.reduce((a,b)=>a+b, 0)
//   return res*2-res2
// };
// console.log(singleNumber([4,1,2,1,2]))


// 多数元素
// 给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
// 你可以假设数组是非空的，并且给定的数组总是存在多数元素。

// var majorityElement = function(nums) {
//     let count = 1
//     let provit = nums[0]
//     for(let i=1;i<nums.length;i++) {
//         if(count <= 0) provit = nums[i]
//         if(nums[i] === provit) count++
//         else count--
//     }
//     return provit
// };
// console.log(majorityElement([3,2,3]))

// this优先级：new绑定 > 显示绑定 > 隐式绑定 > 默认绑定
// 函数是否在new中调用(new绑定)，如果是，那么this绑定的是新创建的对象；
// 函数是否通过call,apply调用，或者使用了bind(显示绑定)，如果是，那么this绑定的就是指定的对象；
// 函数是否在某个上下文对象中调用(隐式绑定)，如果是的话，this绑定的是那个上下文对象。一般是obj.fun()；
// 如果以上都不是，那么使用默认绑定。如果在严格模式下，则绑定到undefined，否则绑定到全局对象(node环境的全局对象是globalThis，浏览器环境就是window)；
// 如果把null或者undefined作为this的绑定对象传入call、apply或者bind，这些值在调用时会被忽略，实际应用的是默认绑定规则；
// 如果是箭头函数，箭头函数的this继承的是外层代码块的this。
// -------------------------------------------------------
// this指向对象属性链中最后一层
// 隐式绑定的大陷阱 - 绑定丢失
// 1.将函数的引用给另一变量时：按照变量的环境指向
// 2.回调函数中：this使用的是默认绑定

// 变量未声明直接赋值的情况下会被隐式创建为一个全局变量


// // sort多元素排序
// var items = [
//     { name: 'Edward', value: 21, gender: 0 },
//     { name: 'Sharpe', value: 37, gender: 1 },
//     { name: 'And', value: 45, gender: 0 },
//     { name: 'The', value: 21, gender: 1 },
//     { name: 'Magn', value: 2, gender: 1 },
//     { name: 'Zeros', value: 37, gender: 0 }
//   ];
//  let res = items.sort(function (a, b) {
//    let val1 = a.value
//    let val2 = b.value
//    if(val1 === val2) {
//      return a.gender - b.gender
//    }
//    return val1 - val2
//   });
//   console.log(res)


// 三数之和
// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。
// 示例 1：
// 输入：nums = [-1,0,1,2,-1,-4]
// 输出：[[-1,-1,2],[-1,0,1]]

// 示例 2：
// 输入：nums = []
// 输出：[]
// 示例 3：
// 输入：nums = [0]
// 输出：[]
// 实在没有想法也没有思路，暴力感觉三层循环好难，看了下人家的思路
// 思路
// 标签：数组遍历
// 首先对数组进行排序，排序后固定一个数 nums[i]，再使用左右指针指向 nums[i]后面的两端，数字分别为 nums[L] 和 nums[R]，计算三个数的和 sum 判断是否满足为 0，满足则添加进结果集
// 如果 nums[i]大于 0，则三数之和必然无法等于 0，结束循环
// 如果 nums[i] == nums[i-1]，则说明该数字重复，会导致结果重复，所以应该跳过
// 当 sum == 0 时，nums[L] == nums[L+1] 则会导致结果重复，应该跳过，L++
// 当 sum == 0 时，nums[R] == nums[R-1] 则会导致结果重复，应该跳过，R-−
// 时间复杂度：O(n^2)O(n 
// 2
//  )，n 为数组长度

// var threeSum = function(nums) {
//   let len = nums.length
//   let res = []
//   if(len<=2) return []
//   nums.sort((a,b)=>a-b)
//   for(let i =0; i<len; i++) {
//     if(nums[i]>0) break
//     if(i>=1 && nums[i]===nums[i-1]) continue
//     let L = i+1, R = len - 1
//     while (L<R) {
//       let sum = nums[i] + nums[L] + nums[R]
//       if(sum === 0) {
//         res.push([nums[i], nums[L], nums[R]])
//         while (L<R && nums[L] === nums[L+1]) L++
//         while (L<R && nums[R] === nums[R-1]) R--
//         L++
//         R--
//       } else if(sum < 0) {
//         L++
//       } else if(sum > 0) {
//         R--
//       }
//     }
//   }
//   return res
// };
// console.log(threeSum([-1,0,1,2,-1,-4]))

// 颜色分类
// 给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
// 我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
// 必须在不使用库的sort函数的情况下解决这个问题。
// 示例 1：
// 输入：nums = [2,0,2,1,1,0]
// 输出：[0,0,1,1,2,2]
// 示例 2：
// 输入：nums = [2,0,1]
// 输出：[0,1,2]
// 只循环1遍，双指针p0指向数组开头，p2指向数组结尾
// 只要p0<=p2
// 把p2指针及之前所有的2交换到后面去，交换一位p2指针往前移1位
// 确保p0之前所有的元素都是0
//  var sortColors = function(nums) {
//     console.log(nums)
//     let p0 = 0
//     let len = nums.length
//     let p2 = len - 1
//     for(let i=0;i<=p2; i++) {
//         while (i<=p2 && nums[i]==2) {
//             [nums[i], nums[p2]] = [nums[p2], nums[i]]
//             p2--
//         }
//         if(nums[i]===0) {
//             [nums[i], nums[p0]] = [nums[p0], nums[i]]
//             p0++
//         }
//     }
    
//     console.log(nums)
    
// };
// console.log(sortColors([2,0,2,1,1,0]))

// // 请实现一个函数计算某个任务剩余的时间，给定targetTime时间戳返回形式如xx天xx小时xx分的字符串
// function remainTime(targetTime) {
//     let time = new Date(targetTime)
//     let now = new Date().getTime() - time
//     console.log(now/1000/60/60) 
//     let hour = now % (60 * 60 * 1000), hour2 = Math.floor(now / 60 / 60 / 1000)
//     let min = hour % (60 *  1000), min2 = Math.floor(hour / 60 / 1000)
//     let second = hour % 1000, second2 = Math.floor(min / 1000)
//     console.log(hour, min, second)
//     console.log(hour2, min2, second2)
//     return `${hour2}时 ${min2}分 ${second2}秒` 
// }
// console.log(remainTime(1649921406000))

// 实现一个函数对数组内的元素进行随机打乱顺序，如shuffleArray([0,1,2,3,4] => [1,3,4,0,2])
// function shuttleArr(a) {
// //    console.log(params.sort(()=>Math.random() - 0.5))
// // 洗牌算法
// for (let i = a.length; i; i--) {
//     let j = Math.floor(Math.random() * i);
//     [a[i - 1], a[j]] = [a[j], a[i - 1]];
// }
// return a
// }
// console.log(shuttleArr([0,1,2,3,4]))


// // 写一个函数用来归并数组内的数据求出每一项的总和
// // [{a:1,b:1}, null, {a:2, c: 1}, {b:3}, 10, {}] => {a: 3, b:4, c:1}
// function mergeObj(params) {
//     params = params.filter(e=>{ return e && typeof(e) === 'object' && Object.keys(e).length})
//     let obj = {}
//     for(let i=0; i<params.length; i++){
//         Object.keys(params[i]).forEach((item)=>{
//          if(!Object.keys(obj).includes(item)) {
//              obj[item] = params[i][item]
//          } else {
//              obj[item] += params[i][item]
//          }
//         })
//     }
//     return obj
//  }
//  console.log(mergeObj([{a:1,b:1}, null, {a:2, c: 1}, {b:3}, 10, {}]))

// 换零钱问题  最少多少次
// [1, 3, 5]  11
// function coinChange (nums, count) {
//     let optimize = count+1
//     if(count ===0) return 0
//     if(count < 0) return -1
//     for(let i=0; i<nums.length; i++) {
//         let subOpt = coinChange(nums, count - nums[i])
//         if(subOpt === -1) continue
//         optimize = Math.min(optimize, subOpt+1)
//     }
//     return optimize
// }
// console.log(coinChange([1, 3, 5], 11))
// function coinChange(arr, count){
//     let optimize = count + 1
//     if(count === 0) return 0
//     if(count<0) return -1   
//     for(var i=0;i<arr.length;i++){
//         let subOpt = coinChange(arr, count - arr[i])
//         if (subOpt === -1) continue
//         optimize = Math.min(optimize, subOpt + 1)
//     }
//     return optimize
// }
// console.log(coinChange([1, 3, 5, 7], 11))

// 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
// 请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
// 注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，
// 其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。
// 示例 1：
// 输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
// 输出：[1,2,2,3,5,6]
// 解释：需要合并 [1,2,3] 和 [2,5,6] 。
// 合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。
// var merge = function(nums1, m, nums2, n) {
//     let len = nums1.length
//     if(n===0) return nums1
//     nums1.splice(m, len, ...nums2)
//     for(let i=0; i<len-1;i++) {
//         for(j = 0; j< len-1-i; j++){
//             if(nums1[j] > nums1[j+1]) {
//                 [nums1[j], nums1[j+1]] = [nums1[j+1],nums1[j]]
//             }
//         }
//     }
//     return nums1
// };

// function getSum (a, b, c) {
//     return a+b+c
// }
// function curry (fn) {
//     return function curriedFn(...args) {
//         if(args.length < fn.length) {
//             return function() {
//                 return curriedFn(...args.concat(Array.from(arguments)))
//             }
//         } else {
//             return fn(...args)
//         }
//     }
// }
// let add = curry(getSum)

// console.log(add(1,2, 3))  //  打印6
// console.log(add(1)(2,3))  //  打印6
// console.log(add(1)(3)(2)) //  打印6
// console.log(add(1,2)(3))  //  打印6

// 在一个长度为 n 的数组 nums 里的所有数字都在 0 ~ n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。
// 输入：[2, 3, 1, 0, 2, 5, 3]
// 输出：2 或 3
// var repeatNum = function (arr) {
//     console.log(arr)
//     let map = new Map()
//     for(let i=0; i<arr.length; i++) {
//         if(map.has(arr[i])) {
//             return map.get(arr[i])
//         }
//         map.set(arr[i], arr[i])
//     }  
// }
// console.log(repeatNum([2, 3, 1, 0, 2, 5, 3]))

// JS实现一个控制并发请求数的任务队列 控制并发任务在 n 个以内，超出的在队列等待