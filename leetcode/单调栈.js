/* 给你一个数组 prices ，其中 prices[i] 是商店里第 i 件商品的价格。

商店里正在进行促销活动，如果你要买第 i 件商品，那么你可以得到与 prices[j] 相等的折扣，其中 j 是满足 j > i 且 prices[j] <= prices[i] 的 最小下标 ，如果没有满足条件的 j ，你将没有任何折扣。

请你返回一个数组，数组中第 i 个元素是折扣后你购买商品 i 最终需要支付的价格。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/final-prices-with-a-special-discount-in-a-shop
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */
/**
 * @param {number[]} prices
 * @return {number[]}
 */
var finalPrices = function (prices) {
  const n = prices.length;
  const ans = new Array(n).fill(0);
  const stack = [];
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length && stack[stack.length - 1] > prices[i]) {
      stack.pop();
    }
    ans[i] = stack.length === 0 ? prices[i] : prices[i] - stack[stack.length - 1];
    stack.push(prices[i]);
  }
  return ans;
};
