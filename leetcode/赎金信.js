var canConstruct = function (ransomNote, magazine) {
  // 赎金不够直接false
  if (ransomNote.length > magazine.length) {
    return false;
  }
  //初始化数组
  const cnt = new Array(26).fill(0);
  //统计“赎金”中每一项字符的次数
  for (const c of magazine) {
    cnt[c.charCodeAt() - "a".charCodeAt()]++;
  }
  //通过对每个字符的字符次数比较，如果“赎金”不够也返回false
  for (const c of ransomNote) {
    cnt[c.charCodeAt() - "a".charCodeAt()]--;
    if (cnt[c.charCodeAt() - "a".charCodeAt()] < 0) {
      return false;
    }
  }
  return true;
};
console.log(canConstruct("aabbccde", "abcde"));
