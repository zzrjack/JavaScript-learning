/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
//以数组右上角元素为例， 只可取右上和左下。
var findNumberIn2DArray = function (matrix, target) {
  if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
    return false;
  }
  let x = 0,
    y = matrix[0].length - 1;
  while (x < matrix.length && y >= 0) {
    if (matrix[x][y] < target) {
      x++;
    } else if (matrix[x][y] > target) {
      y--;
    } else {
      return true;
    }
  }
  return false;
};
