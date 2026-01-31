#!/usr/bin/env node

/**
 * Article Summarizer
 * Processes and summarizes articles passed to it
 */

const fs = require('fs');
const path = require('path');

// Function to get today's date in YYYY-MM-DD format
function getToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Function to create article summary template
function createArticleSummary(url, title = 'Untitled') {
    const today = getToday();
    const articlesDir = path.join(__dirname, '../articles');
    const fileName = `${today}_${encodeURIComponent(title.substring(0, 50)).replace(/[^a-z0-9]/gi, '_')}.md`;
    const filePath = path.join(articlesDir, fileName);
    
    const content = `# ${title || 'Article Summary'}

**Date:** ${today}
**URL:** ${url || 'N/A'}

## Summary

[Summary will be added here]

## Key Points

- [Point 1]
- [Point 2]
- [Point 3]

## Personal Thoughts

[Your thoughts go here]

## Action Items

- [ ] [Action item 1]
- [ ] [Action item 2]
`;

    if (!fs.existsSync(articlesDir)) {
        fs.mkdirSync(articlesDir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Created article summary file: ${filePath}`);
    
    return filePath;
}

// Main execution - expects URL and optionally title as arguments
const args = process.argv.slice(2);
if (args.length >= 1) {
    const url = args[0];
    const title = args[1] || 'Untitled';
    console.log(`Creating summary for: ${url}`);
    const summaryFile = createArticleSummary(url, title);
    console.log(`Summary template created at: ${summaryFile}`);
} else {
    console.log('Usage: node article_summarizer.js <url> [title]');
    
    // Create a sample file for testing
    const sampleFile = createArticleSummary('https://example.com', 'Sample Article');
    console.log(`Sample template created at: ${sampleFile}`);
}