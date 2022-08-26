/* 给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

我们使用整数 0、1 和 2 分别表示红色、白色和蓝色。

必须在不使用库的sort函数的情况下解决这个问题。 */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  if (!Array.isArray(nums)) console.log("Invaild Input");
  if (!nums.length) return [];
  let [cur, left, right] = [0, 0, nums.length - 1];
  //交换函数
  const swap = (a, b) => {
    let temp = nums[a];
    nums[a] = nums[b];
    nums[b] = temp;
  };
  while (cur <= right) {
    //当前元素=0，将其交换到左边
    if (nums[cur] === 0) {
      swap(left, cur);
      left++;
      cur++;
    }
    //当前元素=2，将其交换到右边
    else if (nums[cur] === 2) {
      swap(cur, right);
      right--;
    } else {
      cur++;
    }
  }
  return nums;
};
