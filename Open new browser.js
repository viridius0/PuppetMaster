// Import the puppeteer-extra package along with the stealth plugin
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// Activate the stealth plugin to make the browser automation less detectable
puppeteer.use(StealthPlugin());

// Immediately Invoked Function Expression (IIFE) to execute the code asynchronously
(async () => {
  try {
    // Set the path to the Chrome executable, this needs to be changed based on your setup
    const chromeExecutablePath = '/usr/bin/google-chrome'; // Replace with your Chrome path

    // Launch a new browser instance with specific configurations
    const browser = await puppeteer.launch({
      userDataDir: './profile/viridius',  // Path to save user data (like cookies, history)
      headless: false,                    // Launches a browser with a GUI (graphical user interface)
      executablePath: chromeExecutablePath, // Specifies the path to Chrome executable
      args: ['--no-sandbox', '--user-data-dir=./profile/viridius', '--remote-debugging-port=9222', '--disable-blink-features=AutomationControlled'] // Command-line flags passed to Chrome
    });

    // Log a success message when the browser is successfully opened
    console.log('Headed browser opened in stealth mode with specified Chrome executable.');

    // Here you would usually include code to interact with the browser
    // ... (your puppeteer code to interact with pages would go here)

    // The browser instance remains open for manual interaction
    // In a real script, you typically close the browser with browser.close() when done
    
  } catch (error) {
    // If any error occurs in the try block, this will catch it and log it to the console
    console.error("An error occurred: ", error);
  }
})();
