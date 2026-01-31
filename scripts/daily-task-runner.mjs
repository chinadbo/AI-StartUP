#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runDailyTask() {
  console.log('🤖 Starting daily AI news fetch task...');
  
  try {
    // Fetch the latest AI news
    console.log('📡 Fetching latest AI news...');
    const fetchProcess = spawn('node', ['./fetch-ai-news.mjs'], { 
      cwd: __dirname,
      stdio: 'inherit' 
    });
    
    await new Promise((resolve, reject) => {
      fetchProcess.on('close', (code) => {
        if (code === 0) {
          console.log('✅ News fetch completed');
          resolve();
        } else {
          reject(new Error(`News fetch failed with code ${code}`));
        }
      });
    });
    
    // Build the website with the new content
    console.log('🔄 Building website with new content...');
    const buildProcess = spawn('node', ['./build-for-gh-pages.mjs'], { 
      cwd: __dirname,
      stdio: 'inherit' 
    });
    
    await new Promise((resolve, reject) => {
      buildProcess.on('close', (code) => {
        if (code === 0) {
          console.log('✅ Build completed');
          resolve();
        } else {
          reject(new Error(`Build failed with code ${code}`));
        }
      });
    });
    
    // Push changes to remote repository
    console.log('📤 Pushing changes to remote repository...');
    const pushProcess = spawn('node', ['./push-to-remote.mjs'], { 
      cwd: __dirname,
      stdio: 'inherit' 
    });
    
    await new Promise((resolve, reject) => {
      pushProcess.on('close', (code) => {
        if (code === 0) {
          console.log('✅ Push completed');
          resolve();
        } else {
          reject(new Error(`Push failed with code ${code}`));
        }
      });
    });
    
    console.log('✅ Daily task completed successfully!');
  } catch (error) {
    console.error('❌ Daily task failed:', error.message);
    process.exit(1);
  }
}

// If this script is run directly, execute the task
if (import.meta.url === `file://${process.argv[1]}`) {
  runDailyTask();
}

export { runDailyTask };