import * as fs from 'fs';
const storage = './src/assets';

// from https://vegsoc.org/cookery-school/blog/seasonal-uk-grown-produce/
let file = fs.readFileSync(`${storage}/seasonality-per-month.csv`, 'utf8');

let foods = file.split('\n').map((row) => {
    return row.split(', ');
});

let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

let results = {};

for (let month in months) {
    results[months[month]] = foods[month];
}

fs.writeFileSync(`${storage}/seasonality.json`, JSON.stringify(results, null, 2));

console.log('✨ Done!');
