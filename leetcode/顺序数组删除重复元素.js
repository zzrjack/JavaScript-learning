/**
 * @param {number[]} nums
 * @return {number}
 */
//K为保留重复项有多少位
function process(nums, k) {
  let u = 0;
  //若保留K位则前K项可直接保留，从K＋1项开始遍历，判断条件若nums[u-k]!=nums[u]则保留当前项
  nums.forEach((x) => {
    if (u < k || nums[u - k] != x) nums[u++] = x;
  });
  return u;
}
