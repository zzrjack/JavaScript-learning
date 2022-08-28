/* f(x) 是 x! 末尾是 0 的数量。回想一下 x! = 1 * 2 * 3 * ... * x，且 0! = 1 。

例如， f(3) = 0 ，因为 3! = 6 的末尾没有 0 ；而 f(11) = 2 ，因为 11!= 39916800 末端有 2 个 0 。
给定 k，找出返回能满足 f(x) = k 的非负整数 x 的数量。

 

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/preimage-size-of-factorial-zeroes-function
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
//思路：分解出多少个5，尾部就有多少个零
/**
 * @param {number} k
 * @return {number}
 */
var preimageSizeFZF = function (k) {
  let min = 0;
  let max = k + 1;
  //2分查找
  while (min < max) {
    let center = Math.floor((min + max) / 2);
    let numZero = tools(center);
    if (numZero > k) {
      max = center;
    } else if (numZero < k) {
      min = center + 1;
    } else {
      return 5;
    }
  }
  return 0;

  //5*m的阶乘的0的个数
  function tools(m) {
    let result = m;
    while (m > 0) {
      m = Math.floor(m / 5);
      result += m;
    }
    return result;
  }
};
