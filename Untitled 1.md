给定两个非空二叉树 **s** 和 **t**，检验 **s** 中是否包含和 **t** 具有相同结构和节点值的子树。**s** 的一个子树包括 **s** 的一个节点和这个节点的所有子孙。**s** 也可以看做它自身的一棵子树。

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */
function deepfirst(s){
    let node = [s]
    let res = []
    while(node.length){
    let cur = node.pop()
    if(cur){
        res.push(cur)
        if(cur.left ==null && cur.right == null){
            continue
        }
        node.push(cur.left,cur.right)
    }  
    }

    return res
}
function compare(a,b){
    return (JSON.stringify(a)==JSON.stringify(b))
}
var isSubtree = function(s, t) {
    let treeS = deepfirst(s).join('')
    let treeT = deepfirst(t).join('')
    let res =false;
    deepfirst(s).forEach(item=>{
        if(compare(item,t)){
            res = true
        }
    })
    return res  
};
```

