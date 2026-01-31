const { execSync } = require('child_process');
const fs = require('fs-extra');

async function pushToRemote() {
  try {
    console.log('Pushing changes to remote repository...');
    
    // Add all changes
    execSync('git add .', { stdio: 'pipe' });
    
    // Check if there are changes to commit
    const statusOutput = execSync('git status --porcelain', { encoding: 'utf-8' });
    
    if (!statusOutput.trim()) {
      console.log('No changes to commit.');
      return;
    }
    
    // Create a commit with timestamp
    const timestamp = new Date().toISOString();
    execSync(`git commit -m "Automated update: ${timestamp}"`, { stdio: 'pipe' });
    
    // Push to main branch
    execSync('git push origin main', { stdio: 'inherit' });
    
    console.log('Changes pushed to remote repository successfully!');
  } catch (error) {
    console.error('Failed to push to remote:', error.message);
    process.exit(1);
  }
}

// If this script is run directly, execute the push
if (require.main === module) {
  pushToRemote();
}

module.exports = { pushToRemote };