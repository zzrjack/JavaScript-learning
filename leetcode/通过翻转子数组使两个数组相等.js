/* 给你两个长度相同的整数数组 target 和 arr 。每一步中，你可以选择 arr 的任意 非空子数组 并将它翻转。你可以执行此过程任意次。

如果你能让 arr 变得与 target 相同，返回 True；否则，返回 False 。
 */
var canBeEqual = function (target, arr) {
  let a = arr.sort((a, b) => a - b).toString();
  let b = target.sort((a, b) => a - b).toString();
  if (a === b) {
    return true;
  } else return false;
};
