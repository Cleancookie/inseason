const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const url = 'https://www.bbcgoodfood.com/seasonal-calendar/all';
 
(async () => {
  const browser = await puppeteer.launch({
        // headless: false,
        // slowMo: 150,
        defaultViewport: null
    });
  const page = await browser.newPage();

  // load page
  await page.goto(url);
  const $ = cheerio.load(await page.content());

  // Accept GDPR
  // await (await page.$('#qcCmpButtons > button:nth-child(2)')).click();

  // Select rows
  const rows = $('#scrollable-section > table > tbody > tr');

  // Go through all rows and get names
  let foods = [];
  await rows.each((rowId, row) => {
    $row = cheerio.load(row);

    // Get name of the food
    let foodName = $row('td:nth-child(1)').text();
    foods.push({
        'name': foodName
    });
  });

  console.log(foods);
 
  await browser.close();
})();