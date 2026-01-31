const fs = require('fs-extra');
const path = require('path');
const { analyzeArticle } = require('./analyze-article');
const { buildForGitHubPages } = require('./build-for-gh-pages');
const { pushToRemote } = require('./push-to-remote');

async function processUserArticle(articleContent, title = 'User Submitted Article') {
  console.log('Processing user submitted article...');
  
  try {
    // Analyze the article
    await analyzeArticle(articleContent, title);
    
    // Build the website with the new content
    await buildForGitHubPages();
    
    // Push changes to remote repository
    await pushToRemote();
    
    console.log('User article processed and deployed successfully!');
  } catch (error) {
    console.error('Failed to process user article:', error.message);
    process.exit(1);
  }
}

// If this script is run directly and provided with arguments
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('Usage: node process-user-article.js "<article_content>" "[title]"');
    process.exit(1);
  }
  
  const content = args[0];
  const title = args[1] || 'User Submitted Article';
  
  processUserArticle(content, title);
}

module.exports = { processUserArticle };