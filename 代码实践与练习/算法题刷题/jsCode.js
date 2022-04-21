// // 1.js实现一个打点计时器，从start到end，每隔100毫秒打印一个数字，每次数字增幅为1，返回中包含一个cancel方法，用于停止定时操作，第一个数要立即返回
// function countNumber(start,end){
//     if(end>=start){console.log(start++)}
//     var count = setTimeout(()=>{countNumber(start,end)},100)
//     return {
//         cancel:function(count){
//             clearTimeout(count)
//         }
//     }
// }
// // 如果没有条件限制的话也可以这样实现
// function countNumber(start,end){
//     console.log(start++)
//     var count = setTimeout(()=>{countNumber(start,end)},100)
//     if(start>end){
//         clearTimeout(count)
//     }          
// }
// countNumber(10,20)


// // 2.fabnacci斐波那茨算法,给函数加上缓存的方式优化性能 1->1 2->1 3->2
// let obj={1:1,2:1}
// // console.time()
// function fbnacci(n){
//     if(obj[n]){
//         return obj[n]
//     }
//     else{
//         let result = fbnacci(n-2) + fbnacci(n-1)
//         obj[n] = result
//         return result
//     }
// }
// console.log(fbnacci(1000))
// // console.timeEnd()


// // 3.给定一个字符串,只会出现（）｛｝[] 六种字符，判断这个字符的括号是否匹配,用栈
// function isMatch(str){
//     let len = str.length
//     if(len % 2){ return false }
//     let obj = {')':'(','}':'{',']':'['}
//     let stack =[]
//     for(let i=0;i<str.length;i++){
//         let c = str.charAt(i)
//         if(Object.values(obj).includes(c)){
//             stack.push(c)   
//         }                         
//         else if(obj[c]){
//             if(!(obj[c] == stack.pop())){
//                 stack.push(c)
//             }                     
//         }
//     }        
//     if(stack.length == 0) return true
//     else return false
// }
// console.log(isMatch('{{()}}'))


// // 4.使括号有效的最少添加:给定一个由 '(' 和 ')' 括号组成的字符串 S，我们需要添加最少的括号（ '(' 或是 ')'，可以在任何位置），以使得到的括号字符串有效。
// var minAddToMakeValid = function(S) {
//     const s = S
//     let stack = [],count =0
//     for(var i=0;i<S.length;i++){
//         // 出栈条件-栈顶为'('且后面有为')'的项
//         while(stack.length && stack[stack.length-1]=='(' && S[i] ==')' ){
//             S = S.replace(')','')
//             stack.pop()
//             count++
//         }
//         if(S[i]=='('){
//             stack.push(S[i])
//         }              
//     }
//     return S.length - count
// };
// minAddToMakeValid("()))))")


// // 5.解析url字符串为Object  2020-06-24
// function parseUrl(str){
//     let obj = {}
//     console.log(str)
//     obj.protocol = str.split(':')[0]
//     obj.host = str.split('/')[2]
//     obj.hash = str.split('#')[1]
//     let inner
//     if(str.indexOf('#')){
//         inner = str.substring(str.indexOf('?')+1,str.indexOf('#'))
//     }
//     else{
//         inner = str.substring(str.indexOf('?')+1)
//     }
//     var arr = inner.split('&')
//     obj.param = {}
//     for(var i=0;i<arr.length;i++){
//         arr[i]=arr[i].split('=')
//         obj.param[arr[i][0]] = arr[i][1]
//     }
//     obj.path = str.substring(str.indexOf(obj.host),str.indexOf('?')).slice(obj.host.length+1)
//     console.log(obj)
// }
// // 正則 不太会
// // 其他常见正则
// // /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/ 5-16个字节，字母开头，允许字母数字和下划线
// // /^\d{15}|\d{18}$/ 身份证号，15或18位
// // /^[1-9]\d*$/  正整数正则   /^([1-9]\d+)|([2-9])$/ 大于1的正整数
// // /^[A-Za-z0-9]{3,20}$/ 3-20位大小写字母或数字组合
// parseUrl("http://www.xiyanghui.com/product/list?id=123456&sort=discount#title")


/*
    6.设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。（时间复杂度O(1)）
    push(x) —— 将元素 x 推入栈中。
    pop() —— 删除栈顶的元素。
    top() —— 获取栈顶元素。
    getMin() —— 检索栈中的最小元素。 2020-06-24
*/
// // 方法1，设立一个数据栈，一个最小值栈       
// var MinStack = function() {
//     this.data = [],this.min = [] 
// };
// MinStack.prototype.push = function(x) {
//     this.data.push(x)
//     if(this.min.length === 0 || x <= this.min[this.min.length-1]){               
//         this.min.push(x)
//     }
// }
// MinStack.prototype.pop = function() {
//     let a = this.data.pop()
//     if(this.min[this.min.length-1] == a){
//         this.min.pop()
//     }
// }
// MinStack.prototype.top = function() {
//     return this.data[this.data.length-1]
// }
// MinStack.prototype.getMin = function() {
//     return this.min[this.min.length-1]
// }
// // 方法2，设立一个栈，分别存储value和最小值
// var MinStack = function() {
//     this.data = []
// };
// MinStack.prototype.push = function(x) {
//     if(this.data.length === 0 || x <= this.data[this.data.length-1].min){
//         this.data.push({data:x,min:x})
//         console.log(this.data)
//     }
//     else{
//         this.data.push({data:x,min:this.data[this.data.length-1].min})
//     }
// }
// MinStack.prototype.pop = function() {
//     this.data.pop()
// }
// MinStack.prototype.top = function() {
//     return this.data[this.data.length-1].data
// }
// MinStack.prototype.getMin = function() {
//     return this.data[this.data.length-1].min
// }
// var minstack = new MinStack()
// minstack.push(1)
// minstack.push(2)


// // 7.数组解析  2020-06-24
// let arr = [
//     {id:1,name:'小明'},
//     {id:1,name:'小红'},
//     {id:1,name:'小兰'},
//     {id:1,name:'小张'},
//     {id:2,name:'小红'},
//     {id:2,name:'小兰'},
//     {id:2,name:'小张'},
//     {id:3,name:'小红'},
//     {id:3,name:'小兰'},
//     {id:3,name:'小张'},
// ]
// // 方法1
// function formatArr(arr){
//     let obj = {}
//     arr.forEach((element,index) => {
//         if(!obj[element.id]){
//             obj[element.id] = [element.name]
//         }
//         else{
//             obj[element.id].push(element.name)
//         }
//     });
//     let result = []
//     for(var i in obj){
//         var item = {id:i,name:obj[i]}
//         result.push(item)
//     }
//     return result;
// } 
// // 方法2  
// function formatArr(arr){
//     let result = [];      
//     for(var i=0; i<arr.length; i++){
//         let index = result.findIndex((ele)=>{
//             return ele.id == arr[i].id
//         })
//         if(index<0){
//             result.push({id:arr[i].id,name:[arr[i].name]})
//         }
//         else{
//             result[index].name.push(arr[i].name)
//         }
//     }
//     return result
// }     
// console.log(formatArr(arr))  


/*
    8.给定一个非负整数数组 A， A 中一半整数是奇数，一半整数是偶数。
    对数组进行排序，以便当 A[i] 为奇数时，i 也是奇数；当 A[i] 为偶数时， i 也是偶数。
    你可以返回任何满足上述条件的数组作为答案。 2020-06-24*/
// var sortArrayByParityII = function(A) {
//     let result = []
//     let ji = [],ou = [],len = A.length;
//     for(var i=0;i<len;i++){
//         if(A[i]%2){
//             ji.push(A[i])
//         }else{
//             ou.push(A[i])
//         }
//     }
//     for(let i=0;i<ou.length; i++) {
//         result.push(ou[i])
//         result.push(ji[i])
//     }
//     return result
// }
// console.log(sortArrayByParityII([4,2,5,7,9,8,6,5,3,6]))

// // 9.给定一个非负整数 N，找出小于或等于 N 的最大的整数，同时这个整数需要满足其各个位数上的数字是单调递增。 2020-06-24
// var monotoneIncreasingDigits = function(N) {   
//     if(N<10) { return N }    
//     let arr = String(N).split('')
//     let len = arr.length
//     let isMatch = true
//     for(var i=0;i<len;i++){
//         if(arr[i+1]<arr[i]){
//             isMatch = false
//         }
//     } 
//     return isMatch?N:monotoneIncreasingDigits(N-1)
// };
// console.log(monotoneIncreasingDigits(32600))


// // 11.要想观测到更高的气温，至少需要等待的天数。如果气温在这之后都不会升高，请在该位置用 0 来代替。 2020-06-26
// // 可以用暴力解法来遍历，但是时间复杂度过高，所以用栈，感觉叫动态规划更合适
// // 进栈-出栈-赋值-循环
// var dailyTemperatures = function(T) {
//     console.log(T)
//     let stack = [],result = new Array(T.length).fill(0)
//     for(var i=0;i<T.length;i++){
//         // 出栈
//         // 循环遍历条件
//         while(stack.length && T[stack[stack.length-1]] < T[i]){
//             // 赋值
//             result[stack[stack.length-1]] = i - stack[stack.length-1]
//             stack.pop()
//         }
//         // 进栈
//         stack.push(i)       
//     }
//         console.log(result)
//         return result
//     }              
// dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])  
// // [1, 1, 4, 2, 1, 1, 0, 0] 