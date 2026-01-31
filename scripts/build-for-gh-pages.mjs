import { execSync } from 'child_process';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function buildForGitHubPages() {
  try {
    console.log('Building Next.js application...');
    
    // Remove old build
    if (fs.existsSync('./out')) {
      fs.rmSync('./out', { recursive: true, force: true });
    }
    
    // Build the application
    execSync('npm run build', { stdio: 'inherit' });
    
    // Copy build output to docs directory
    if (fs.existsSync('./docs')) {
      fs.rmSync('./docs', { recursive: true, force: true });
    }
    
    fs.copySync('./out', './docs');
    
    console.log('Build completed successfully!');
    console.log('Files copied to ./docs directory');
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}

buildForGitHubPages();

export default buildForGitHubPages;