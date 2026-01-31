const { fetchAINews } = require('./fetch-ai-news');
const buildForGitHubPages = require('./build-for-gh-pages');

async function runDailyTask() {
  console.log('Starting daily AI news fetch task...');
  
  try {
    // Fetch the latest AI news
    await fetchAINews();
    
    // Build the website with the new content
    await buildForGitHubPages();
    
    console.log('Daily task completed successfully!');
  } catch (error) {
    console.error('Daily task failed:', error.message);
    process.exit(1);
  }
}

// If this script is run directly, execute the task
if (require.main === module) {
  runDailyTask();
}

module.exports = { runDailyTask };