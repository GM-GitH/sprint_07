const fs = require("fs");
const data = fs
  .readFileSync("./public/data/data.txt", "utf-8", (err, data) => {
    if (err) throw err;
    else return data.toString();
  })
  .split(/\n/);
let dataArray = data.map((line) => {
  line = line.replace(/,/g, "");
  line = line.replace(/ 0/g, ",0");
  line = line.replace(/ 1/g, ",1");
  line = line.replace(/ 2/g, ",2");
  line = line.replace(/ 3/g, ",3");
  line = line.replace(/ 4/g, ",4");
  line = line.replace(/ 5/g, ",5");
  line = line.replace(/ 6/g, ",6");
  line = line.replace(/ 7/g, ",7");
  line = line.replace(/ 8/g, ",8");
  line = line.replace(/ 9/g, ",9");
  line = line.split(",")
  let country = line.slice(0,line.length - 2).join(' ')
  let population = Number(line[line.length - 2])
  let area = parseFloat(line[line.length - 1])
  let density = parseInt(population / area)
  return [country, population, area, density, "\n"]
});

const title = data.shift(0).replace(/ /g,", ")+", Density,"
const listWithoutTitle = dataArray.splice(1)
const orderByDensity = listWithoutTitle.sort((a, b)=>b[3]-a[3])
const listOrderedByDensityWithTitle = title + "\n"+orderByDensity.join("")
fs.writeFileSync("./public/data/dataOrderedByDensity.csv", listOrderedByDensityWithTitle)