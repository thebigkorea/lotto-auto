const fs = require("fs");

const csv =
  fs.readFileSync("lotto.csv", "utf8");

const lines =
  csv.trim().split("\n");

const list = [];

for(let i=1;i<lines.length;i++){

  const row =
    lines[i]
      .replace(/\r/g,"")
      .split(",");

  if(row.length < 8) continue;

  const item = {

    round:Number(row[0]),

    numbers:[
      Number(row[1]),
      Number(row[2]),
      Number(row[3]),
      Number(row[4]),
      Number(row[5]),
      Number(row[6])
    ],

    bonus:Number(row[7])

  };

  if(
    item.round &&
    item.numbers.every(n => n >= 1 && n <= 45) &&
    item.bonus >= 1 &&
    item.bonus <= 45
  ){
    list.push(item);
  }

}

list.sort((a,b)=>a.round-b.round);

const js =
  "const LOTTO_HISTORY = " +
  JSON.stringify(list,null,2) +
  ";";

fs.writeFileSync(
  "lotto-data.js",
  js,
  "utf8"
);

console.log(
  "완료:",
  list.length + "개 회차 저장됨"
);