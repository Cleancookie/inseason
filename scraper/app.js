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
  const rows = $('.foo-table > tbody > tr');
  console.log(`Found ${rows.count} rows`);

  // Go through all rows and get names
  let foods = [];
  await rows.each(async (rowId, row) => {
    const food = {};
    $row = cheerio.load(row);

    // Get name of the food
    const foodName = $row('td:nth-child(1)').text();
    food.name = foodName.trim().toLowerCase();

    // Get months
    food.best = {
      jan: $row("td:nth-child(2)").html().includes("best (1)"),
      feb: $row("td:nth-child(3)").html().includes("best (1)"),
      mar: $row("td:nth-child(4)").html().includes("best (1)"),
      apr: $row("td:nth-child(5)").html().includes("best (1)"),
      may: $row("td:nth-child(6)").html().includes("best (1)"),
      jun: $row("td:nth-child(7)").html().includes("best (1)"),
      jul: $row("td:nth-child(8)").html().includes("best (1)"),
      aug: $row("td:nth-child(9)").html().includes("best (1)"),
      sep: $row("td:nth-child(10)").html().includes("best (1)"),
      oct: $row("td:nth-child(11)").html().includes("best (1)"),
      nov: $row("td:nth-child(12)").html().includes("best (1)"),
      dev: $row("td:nth-child(13)").html().includes("best (1)"),
    };

    foods.push(food);
  });

  // Write to file
  console.log(`Saving to ${filePath}`);

  fs.writeFileSync(filePath, JSON.stringify(foods));
})();
