const fs = require("fs");
const data = fs
  .readFileSync("./public/data/data.txt", "utf-8", (err, data) => {
    if (err) throw err;
    else return data.toString();
  })
  .split(/\n/);
const dataArray = data.map((line) => {
  line = line.replace(/,/g, "").split(" ");
  let country = line.slice(0, line.length - 2).join(" ");
  let population = Number(line[line.length - 2]);
  let area = parseFloat(line[line.length - 1]);
  let density = parseInt(population / area);
  return [country, population, area, density, "\n"];
});

const title = data.shift(0).replace(/ /g, ", ") + ", Density,";
const listWithoutTitle = dataArray.splice(1);
const orderByDensity = listWithoutTitle.sort((a, b) => b[3] - a[3]);
const listOrderedByDensityWithTitle = title + "\n" + orderByDensity.join("");
fs.writeFileSync("./public/data/dataOrderedByDensity.csv", listOrderedByDensityWithTitle);