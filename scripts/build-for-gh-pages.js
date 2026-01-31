const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

async function buildForGitHubPages() {
  try {
    console.log('Building Next.js application...');
    
    // Remove old build
    if (fs.existsSync('./out')) {
      fs.removeSync('./out');
    }
    
    // Build the application
    execSync('npm run build', { stdio: 'inherit' });
    
    // Copy build output to docs directory
    if (fs.existsSync('./docs')) {
      fs.removeSync('./docs');
    }
    
    fs.copySync('./out', './docs');
    
    console.log('Build completed successfully!');
    console.log('Files copied to ./docs directory');
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}

module.exports = buildForGitHubPages;