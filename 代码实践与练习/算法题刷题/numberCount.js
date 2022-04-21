// // 1.小数相加减失精的方法 2020-06-24
// function getNum(a,b){           
//     let arr = a.substr(a.indexOf('.')+1).length
//     let arr2 = b.substr(b.indexOf('.')+1).length
//     let j = Math.max(arr,arr2)
//     let m = Number(a) * Math.pow(10,j)
//     let n = Number(b) * Math.pow(10,j)         
//     return (m+n)/Math.pow(10,j)
// }
// console.log(getNum('0.1','0.2'))

// // 2.超大整数相加   2020-06-28
// function sumBigNumber(a,b){
//     let result='',temp = 0
//     let aArr = a.split('')
//     let bArr = b.split('')
//     while(aArr.length || bArr.length || temp){
//         // 两次按位取反操作可以将string或者NaN类型的值转换为数字计算
//         temp += ~~aArr.pop() + ~~bArr.pop()
//         result = (temp % 10) + result
//         temp = temp > 9?1:0
//     }
//     return result          
// }
// console.log(sumBigNumber('9', '1'))


// // 2.超大整数相乘 2020-06-28
// // 竖式相乘法，用num2的每一项去乘num1 从第二项开始需要在后面补0，最后再使用字符串相加的方式
// function mulBigNumber(num1,num2){
//     let arr2 = num2.split(''),addZe = 0,res = '0',temp = 0
//     for(let i =arr2.length-1;i>=0;i--){
//         addZe = arr2.length - i - 1                          
//         temp = i==arr2.length-1 ? singleMulti(num1,arr2[i]) +'': singleMulti(num1,arr2[i]) + '0'.padStart(addZe, '0')
//         res = sumBigNumber(res, temp);
//     } 
//     res = res.replace(/^0+/, '')?res.replace(/^0+/, ''):'0' 
//     return res
        
// }
// function singleMulti(nums,n){
//     let temp = 0,result = '',arr = nums.split('')
//     while(arr.length || temp){
//         temp += ~~arr.pop() * n
//         result = (temp % 10) + result
//         temp = temp < 10 ? 0 : Math.floor(temp/10)
//     }
//     return result
// }
// // singleMulti('1000','1')
// console.log(mulBigNumber("9","9"))

// // 3.数组中的第K个最大元素。考虑时间复杂度，宜使用快速排序法，平均时间复杂度是O(N) 2020-06-28
// var findKthLargest = function(nums, k) {
//     for(let i=0; i<nums.length; i++) {
//         for(let j = 1; j< nums.length;j++){
//             console.log(i, j)
//             let temp = null
//             if(nums[j-1] < nums[j]) {
//                 temp = nums[j]
//                 nums[j] = nums[j-1]
//                 nums[j-1] = temp
//             }
//         }       
//     }
//     return nums[k-1]
// };
// findKthLargest([3,2,1,5,6,4],2)