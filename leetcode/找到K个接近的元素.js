/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
//整数 a 比整数 b 更接近 x 需要满足：
//|a - x| < |b - x|
var findClosestElements = function (arr, k, x) {
  let a = arr.length;
  let left = 0;
  let right = a - 1;
  //双指针，因为是有序数组所以只需要比较两端，直到剩下k个有序元素即排除排除n-k个元素，同时注意两端相等的情况所以可以=，默认相等情况下排除右侧元素
  for (let i = 0; i < a - k; i++) {
    if (Math.abs(arr[left] - x) <= Math.abs(arr[right] - x)) {
      right--;
    } else {
      left++;
    }
  }
  return arr.slice(left, right + 1);
};
