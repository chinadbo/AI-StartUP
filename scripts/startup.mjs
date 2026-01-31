#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting AI-StartUP deployment process...');

try {
  // Step 1: Build the application
  console.log('\n📦 Building Next.js application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Step 2: Copy build output to docs directory
  console.log('\n📁 Copying build to docs/ directory...');
  if (fs.existsSync('./docs')) {
    fs.rmSync('./docs', { recursive: true, force: true });
  }
  fs.copySync('./out', './docs');
  
  // Step 3: Verify the build
  console.log('\n🔍 Verifying build...');
  const files = fs.readdirSync('./docs');
  console.log(`✅ Successfully built ${files.length} files in docs/ directory`);
  
  // Step 4: Check for common issues
  const indexPath = './docs/index.html';
  if (fs.existsSync(indexPath)) {
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // Check for absolute paths
    const absolutePathMatches = indexContent.match(/(href="\/|src="\/)/g);
    if (absolutePathMatches) {
      console.warn(`⚠️  Found ${absolutePathMatches.length} absolute paths in index.html`);
    } else {
      console.log('✅ No absolute paths found in index.html');
    }
    
    // Check for relative paths
    const relativePathMatches = indexContent.match(/(href="\.\.|src="\.\.)/g);
    console.log(`✅ Found ${relativePathMatches ? relativePathMatches.length : 0} relative paths in index.html`);
  }
  
  console.log('\n🎉 AI-StartUP deployment ready!');
  console.log('📁 The docs/ directory contains the static site ready for GitHub Pages');
  console.log('🌐 Deploy the docs/ folder to GitHub Pages to serve the site');

} catch (error) {
  console.error('\n❌ Error during startup process:', error.message);
  process.exit(1);
}