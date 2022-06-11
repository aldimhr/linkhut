'use strict';
const puppeteer = require('puppeteer');

let screenshot = async (link) => {
  let browser = await puppeteer.launch({
    // headless: false,
    headless: true,
    // slowMo: 250,
    args: [
      '--start-maximized',
      '--headless',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--no-first-run',
      '--no-sandbox',
      '--no-zygote',
      '--incognito',
      '--single-process',
    ],
  });

  // wait browser
  const [page] = await browser.pages();

  // update url
  await page.goto(link, {
    waitUntil: 'domcontentloaded',
  });

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    var body = document.body,
      html = document.documentElement;

    var height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    return height;
  });

  if (dimensions > 2560) {
    await page.setViewport({
      width: 1366,
      height: 2560,
    });
  } else {
    await page.setViewport({
      width: 1366,
      height: dimensions,
    });
  }

  const screenshot = await page.screenshot({
    omitBackground: true,
    encoding: 'binary',
  });

  // close browser
  await browser.close();

  return screenshot;
};

module.exports = { screenshot };
