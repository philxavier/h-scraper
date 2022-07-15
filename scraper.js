const puppetter = require('puppeteer');
require('dotenv').config();

async function logIntoHelium() {
  const browser = await puppetter.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1500, height: 768 });

  await page.goto('https://members.helium10.com/user/signin');
  await page.waitForSelector('#loginform-email');
  await page.focus('#loginform-email');
  await page.keyboard.type(process.env.HELIUMUSER);
  await page.focus('#loginform-password');
  await page.keyboard.type(process.env.HELIUMPASS);
  await page.waitForSelector('.btn');

  await page.focus('.btn');
  await page.keyboard.press('Enter'); // Enter Key
  await page.waitForSelector('.dashboard-welcome-title');
  searchBlackBox(page);

  setTimeout(async () => {
    await browser.close();
  }, 4000);
}

async function searchBlackBox(page) {
  await page.waitForSelector(
    '#h10-style-container > header > nav > ul > ul > li:nth-child(2)'
  );
  await page.click(
    '#h10-style-container > header > nav > ul > ul > li:nth-child(2)'
  );

  await page.waitForSelector(
    '#h10-style-container > div.sc-iJKVRt.eyGnew.fade-enter-done > div.sc-iMCRTP.ePfheF > div.sc-hBezlf.kVhPZf > nav > div > div > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(3) > a > div.sc-dYXZXt.jzZUwL'
  );

  await page.click(
    '#h10-style-container > div.sc-iJKVRt.eyGnew.fade-enter-done > div.sc-iMCRTP.ePfheF > div.sc-hBezlf.kVhPZf > nav > div > div > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(3) > a > div.sc-dYXZXt.jzZUwL'
  );
}

logIntoHelium();
// searchBlackBox();
// (async (params) => {
//   const browser = await puppetter.launch({ headless: false });
//   const page = await browser.newPage();
//   await page.goto(
//     'https://members.helium10.com/black-box/phrases?accountId=1545221025'
//   );

//   const test = await page.evaluate(() => {
//     const title = document.querySelector('.reviewsNumber-column');
//     return title.innerHTML;
//   });

//   console.log(test);
//   await browser.close();
// })();
