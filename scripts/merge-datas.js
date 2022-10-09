import fs from 'fs';
const assets = './src/assets';
const monthsToInt = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11
};
let bbc = fs.readFileSync(`${assets}/bbc-seasonality.json`, 'utf8');
let vegsoc = fs.readFileSync(`${assets}/vegsoc.json`, 'utf8');
let results = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
};

// normalise bbc and vegsoc
bbc = JSON.parse(bbc).reduce((results, row) => {
    for (let month in row.best) {
        if (row.best[month]) {
            const monthNumber = monthsToInt[month];
            results[monthsToInt[month]].push(row.name);
        }
    }

    return results;
}, JSON.parse(JSON.stringify(results)))

vegsoc = JSON.parse(vegsoc);

// merge bbc and vegsoc
for (let month in bbc) {
    results[month] = [...bbc[month]]; // I just want bbc for now
    // results[month] = [...bbc[month], ...vegsoc[month]];
}

fs.writeFileSync(`${assets}/seasonality.json`, JSON.stringify(results, null, 2));