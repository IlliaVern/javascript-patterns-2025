import fs from "node:fs/promises";

const data = await fs.readFile("./data.csv", "utf-8");

if (data) {
  const lines = data.split("\n");
  lines.pop();
  const table = [];
  let first = true;
  let max = 0;
  for (const line of lines) {
    if (first) {
      first = false;
    } else {
      const cells = line.split(",");
      const d = parseInt(cells[3]);
      if (d > max) max = d;
      table.push([cells[0], cells[1], cells[2], cells[3], cells[4]]);
    }
  }
  for (const row of table) {
    const a = Math.round((row[3] * 100) / max);
    row.push(a.toString());
  }
  table.sort((r1, r2) => r2[5] - r1[5]);
  for (const row of table) {
    let s = row[0].padEnd(18);
    s += row[1].padStart(10);
    s += row[2].padStart(8);
    s += row[3].padStart(8);
    s += row[4].padStart(18);
    s += row[5].padStart(6);
    console.log(s);
  }
}
