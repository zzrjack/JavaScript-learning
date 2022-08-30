/* 最大树 定义：一棵树，并满足：其中每个节点的值都大于其子树中的任何其他值。

给你最大树的根节点 root 和一个整数 val 。

就像 之前的问题 那样，给定的树是利用 Construct(a) 例程从列表 a（root = Construct(a)）递归地构建的：

如果 a 为空，返回 null 。
否则，令 a[i] 作为 a 的最大元素。创建一个值为 a[i] 的根节点 root 。
root 的左子树将被构建为 Construct([a[0], a[1], ..., a[i - 1]]) 。
root 的右子树将被构建为 Construct([a[i + 1], a[i + 2], ..., a[a.length - 1]]) 。
返回 root 。
请注意，题目没有直接给出 a ，只是给出一个根节点 root = Construct(a) 。

假设 b 是 a 的副本，并在末尾附加值 val。题目数据保证 b 中的值互不相同。

返回 Construct(b) 。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/maximum-binary-tree-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoMaxTree = function (root, val) {
  const node = new TreeNode(val);
  let prev = null,
    cur = root;
  //如果新传入的val比原本的节点小就循环，查找合适的插入位置
  while (cur != null && cur.val > val) {
    prev = cur;
    cur = cur.right;
  }
  //比原来的树大，就原来的树作作为新树的左树
  if (prev == null) {
    node.left = root;
    return node;
  } else {
    prev.right = node;
    node.left = cur;
    return root;
  }
};

//递归方法：
var insertIntoMaxTree = function (root, val) {
  if (root == null || root.val < val) return new TreeNode(val, root);
  // 如果 val 不是最大的，那么就应该在右子树上，因为 val 节点是接在原始数组 a 的最后一个元素
  else root.right = insertIntoMaxTree(root.right, val);
  return root;
};
