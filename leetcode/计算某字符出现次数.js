//牛客 node
var readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const lines = [];
rl.on("line", function (line) {
  lines.push(line);
  if (lines.length === 2) {
    const input = lines[0];
    const target = lines[1];
    var res = input.match(new RegExp(target, "gim")); //g全局搜索，i不区分大小写，多行搜索支持换行
    if (res === null) console.log(0);
    else console.log(res.length);
  }
});
