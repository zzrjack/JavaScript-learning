var numberOfSteps = function (num) {
  let ret = 0;
  while (num > 0) {
    ret += (num > 1 ? 1 : 0) + (num & 0x01);
    num >>= 1;
  }
  return ret;
};
