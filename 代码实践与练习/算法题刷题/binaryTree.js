// 二叉树 2020-06-25
 /**
* Definition for a binary tree node.
* function TreeNode(val) {
*     this.val = val;
*     this.left = this.right = null;
* }
*/
/**
* @param {TreeNode} root
* @return {number[]}
*/
//  二叉树的中序遍历---思路1：用栈的方式
var inorderTraversal = function(root) {
    let nums = [], stack = []
    while(stack.length || root){
        while(root){
            stack.push(root)
            root = root.left
        }
        root = stack.pop()
        nums.push(root.val)
        root = root.right
    }
   console.log(nums)     
};
// 二叉树的中序遍历---思路2：用递归的方式----涉及到js执行环境栈，后进先出。
var inorderTraversal = function(root) {
    let nums = [];
    let fun = (root) => {
        root.left && fun(root.left);
        nums.push(root.val);
        root.right && fun(root.right);
    }
    root && fun(root);
    return nums;
};
inorderTraversal(
    {val: 1,
    left: null,
    right: {
        val: 2,
        left: { val: 3, left: null, right: null },
        right: null
    }
})

// 二叉树的后续遍历 --- 栈(错了错了)
var postorderTraversal = function(root) {
    var nums=[],stack=[]
    let rootval = root.val
    if(root.left){root = root.left}
    else{root = root.right}
    while(root || stack.length){
        while(root){
            stack.push(root)
            root = root.left
        } 
        root = stack.pop()    
        nums.push(root.val)
        root = root.right
    }
    nums.push(rootval)  
    console.log(nums)                 
};

// 二叉数的前序遍历 --递归（没写完）
// var preorderTraversal = function(root) {
//     let nums = []
//     let fun = function(root){
//     }
//     console.log(root)
// };
postorderTraversal(
    {val: 1,
    left: null,
    right: {
        val: 2,
        left: { val: 3, left: null, right: null },
        right: null
    }
})