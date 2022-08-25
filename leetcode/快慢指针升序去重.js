var removeDuplicates = function (nums) {
  let fast = 0;
  let slow = 0;
  // 思路：慢指针 slow 走在后面，快指针 fast 在前面探路
  while (fast < nums.length) {
    // 循环条件：fast遍历到nums尾部
    if (nums[slow] != nums[fast]) {
      // 元素不重复，让 slow 前进一步，并赋值给 slow
      slow++;
      nums[slow] = nums[fast];
    }
    fast++;
  }
  return slow + 1; //索引边长度加1
};
