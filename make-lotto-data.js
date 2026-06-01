const fs = require("fs");

const csv =
  fs.readFileSync("lotto.csv", "utf8");

const lines =
  csv.trim().split("\n");

const list = [];

for(let i=1;i<lines.length;i++){

  const row =
    lines[i].split(",");

  if(row.length < 9) continue;

  const round =
    Number(row[0]);

  const date =
    row[1];

  const numbers = [
    Number(row[2]),
    Number(row[3]),
    Number(row[4]),
    Number(row[5]),
    Number(row[6]),
    Number(row[7])
  ];

  const bonus =
    Number(row[8]);

  list.push({
    round,
    date,
    numbers,
    bonus
  });

}

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