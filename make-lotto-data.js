const fs = require("fs");

const csv = fs.readFileSync("lotto.csv", "utf8");

const lines = csv.trim().split(/\r?\n/);

const list = [];

for (let i = 1; i < lines.length; i++) {
  const row = lines[i].split(",");

  const round = Number(row[0]);
  const n1 = Number(row[1]);
  const n2 = Number(row[2]);
  const n3 = Number(row[3]);
  const n4 = Number(row[4]);
  const n5 = Number(row[5]);
  const n6 = Number(row[6]);
  const bonus = Number(row[7]);

  const numbers = [n1, n2, n3, n4, n5, n6];

  if (
    round >= 1 &&
    numbers.every(n => Number.isInteger(n) && n >= 1 && n <= 45) &&
    Number.isInteger(bonus) &&
    bonus >= 1 &&
    bonus <= 45
  ) {
    list.push({
      round,
      numbers,
      bonus
    });
  }
}

list.sort((a, b) => a.round - b.round);

const js =
  "const LOTTO_HISTORY = " +
  JSON.stringify(list, null, 2) +
  ";";

fs.writeFileSync("lotto-data.js", js, "utf8");

console.log("완료:", list.length + "개 회차 저장됨");
console.log("첫 회차:", list[0]);
console.log("마지막 회차:", list[list.length - 1]);