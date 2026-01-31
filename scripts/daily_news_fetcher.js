#!/usr/bin/env node

/**
 * Daily AI News Fetcher
 * Retrieves latest AI news and stores them in the news directory
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Function to get today's date in YYYY-MM-DD format
function getToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Function to create daily news file
function createDailyNewsFile() {
    const today = getToday();
    const newsDir = path.join(__dirname, '../news');
    const filePath = path.join(newsDir, `${today}.md`);
    
    const content = `# AI News Summary for ${today}\n\n`;
    
    if (!fs.existsSync(newsDir)) {
        fs.mkdirSync(newsDir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Created daily news file: ${filePath}`);
    
    return filePath;
}

// Main execution
console.log('Fetching daily AI news...');
const newsFile = createDailyNewsFile();

// You can extend this script to actually fetch news from APIs
// For now, it just creates a daily file for manual updates
console.log(`Today's news file created at: ${newsFile}`);