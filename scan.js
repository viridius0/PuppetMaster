const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs'); // Import the file system module

puppeteer.use(StealthPlugin());

(async () => {
  try {
    const browser = await puppeteer.connect({
      browserURL: 'http://localhost:9222',
    });
    const pages = await browser.pages();
    const page = pages[0]; // Use the first page/tab

    // Get interactable elements
    const interactableElements = await page.$$eval('input, button, a, select, textarea, [role="button"], [role="link"], [role="menuitem"], [role="tab"], [role="checkbox"], [role="radio"], [role="option"], [role="switch"]', elements => 
      elements.map(e => ({
        tag: e.tagName.toLowerCase(),
        type: e.type || null,
        text: e.innerText || e.value || null,
        id: e.id || null,
        class: e.className || null
      }))
    );

    // Write the data to scan.ephemeral file
    console.log(JSON.stringify(interactableElements, null, 2));

    await browser.disconnect();
  } catch (error) {
    console.error('Error running Puppeteer script:', error);
    process.exit(1);
  }
})();
