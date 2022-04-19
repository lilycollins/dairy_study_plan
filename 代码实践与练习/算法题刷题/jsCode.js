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


// 4.使括号有效的最少添加:给定一个由 '(' 和 ')' 括号组成的字符串 S，我们需要添加最少的括号（ '(' 或是 ')'，可以在任何位置），以使得到的括号字符串有效。
var minAddToMakeValid = function(S) {
    const s = S
    let stack = [],count =0
    for(var i=0;i<S.length;i++){
        // 出栈条件-栈顶为'('且后面有为')'的项
        while(stack.length && stack[stack.length-1]=='(' && S[i] ==')' ){
            S = S.replace(')','')
            stack.pop()
            count++
        }
        if(S[i]=='('){
            stack.push(S[i])
        }              
    }
    console.log(S,count)
    return S.length - count
};
minAddToMakeValid("()))))")