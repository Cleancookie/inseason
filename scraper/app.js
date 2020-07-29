const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const url = 'https://www.bbcgoodfood.com/seasonal-calendar/all';
const filePath = 'data.json';
 
(async () => {
  
  console.log('Launching browser');
  const browser = await puppeteer.launch({
        // headless: false,
        // slowMo: 150,
        defaultViewport: null
    });
  const page = await browser.newPage();

  // load page
  console.log(`Navigating to ${url}`);
  await page.goto(url);
  const $ = cheerio.load(await page.content());
  browser.close();  

  // Accept GDPR
  // await (await page.$('#qcCmpButtons > button:nth-child(2)')).click();

  // Select rows
  const rows = $('#scrollable-section > table > tbody > tr');

  // Go through all rows and get names
  let foods = [];
  await rows.each(async (rowId, row) => {
    const food = {};
    $row = cheerio.load(row);

    // Get name of the food
    const foodName = $row('td:nth-child(1)').text();
    food.name = foodName.trim().toLowerCase();

    // Get months
    food.bestIn = {
        'jan': $row('td:nth-child(2)').text().includes('At its best'),
        'feb': $row('td:nth-child(3)').text().includes('At its best'),
        'mar': $row('td:nth-child(4)').text().includes('At its best'),
        'apr': $row('td:nth-child(5)').text().includes('At its best'),
        'may': $row('td:nth-child(6)').text().includes('At its best'),
        'jun': $row('td:nth-child(7)').text().includes('At its best'),
        'jul': $row('td:nth-child(8)').text().includes('At its best'),
        'aug': $row('td:nth-child(9)').text().includes('At its best'),
        'sep': $row('td:nth-child(10)').text().includes('At its best'),
        'oct': $row('td:nth-child(11)').text().includes('At its best'),
        'nov': $row('td:nth-child(12)').text().includes('At its best'),
        'dev': $row('td:nth-child(13)').text().includes('At its best'),
    };

    foods.push(food);
  });

  // Write to file
  console.log(`Saving to ${filePath}`);

  fs.writeFileSync(filePath, JSON.stringify(foods));
})();
