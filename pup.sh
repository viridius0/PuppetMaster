#!/bin/bash

# Capture the first command line argument
JS_COMMAND="$1"

# Run the Puppeteer script using the Node interpreter
node -e "
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin()); 
(async () => {
  try {
    const browser = await puppeteer.connect({
      browserURL: 'http://localhost:9222',
    });
    const page = (await browser.pages())[0]; // Define the page variable
    ${JS_COMMAND}
    await browser.disconnect();
  } catch (error) {
    console.error('Error running Puppeteer script:', error);
    process.exit(1);
  }
})()
"