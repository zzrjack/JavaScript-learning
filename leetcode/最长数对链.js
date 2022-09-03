/* 给出 n 个数对。 在每一个数对中，第一个数字总是比第二个数字小。

现在，我们定义一种跟随关系，当且仅当 b < c 时，数对(c, d) 才可以跟在 (a, b) 后面。我们用这种形式来构造一个数对链。

给定一个数对集合，找出能够形成的最长数对链的长度。你不需要用到所有的数对，你可以以任何顺序选择其中的一些数对来构造。

 

示例：

输入：[[1,2], [2,3], [3,4]]
输出：2
解释：最长的数对链是 [1,2] -> [3,4]
 

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/maximum-length-of-pair-chain
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[][]} pairs
 * @return {number}
 */
//贪心算法
var findLongestChain = function (pairs) {
  let curr = -Number.MAX_VALUE,
    res = 0;
  //用尾部排序，符合条件的数组留下（b < c 时，数对(c, d) 才可以跟在 (a, b) 后面）
  //上一数组的p[1]小于当前数组p[0]，res++
  //-Number.MAX_VALUE,js中最小值，第一个数组排序后肯定保留
  pairs.sort((a, b) => a[1] - b[1]);
  for (const p of pairs) {
    if (curr < p[0]) {
      curr = p[1];
      res++;
    }
  }
  return res;
};
