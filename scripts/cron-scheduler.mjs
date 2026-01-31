#!/usr/bin/env node

/**
 * AI-StartUP Automated Scheduler
 * 
 * This script sets up automated tasks:
 * - Daily AI news fetching at 8:00 AM
 * - Automatic site rebuilds when content changes
 */

import cron from 'node-cron';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🤖 Starting AI-StartUP automated scheduler...');

// Schedule daily AI news fetch at 8:00 AM
cron.schedule('0 8 * * *', () => {
  console.log(`\n📅 Daily task triggered at ${new Date().toISOString()}`);
  console.log('Fetching latest AI news...');
  
  const fetchProcess = spawn('node', ['scripts/fetch-ai-news.mjs'], { stdio: 'inherit' });
  
  fetchProcess.on('close', (code) => {
    if (code === 0) {
      console.log('✅ News fetch completed successfully');
      
      // After successful news fetch, rebuild the site
      console.log('🔄 Starting site rebuild...');
      const buildProcess = spawn('node', ['scripts/build-for-gh-pages.mjs'], { stdio: 'inherit' });
      
      buildProcess.on('close', (buildCode) => {
        if (buildCode === 0) {
          console.log('✅ Site rebuilt successfully');
          
          // Push changes to remote
          console.log('📤 Pushing changes to remote repository...');
          const pushProcess = spawn('node', ['scripts/push-to-remote.mjs'], { stdio: 'inherit' });
          
          pushProcess.on('close', (pushCode) => {
            if (pushCode === 0) {
              console.log('✅ Changes pushed to remote successfully');
            } else {
              console.error('❌ Failed to push changes to remote');
            }
          });
        } else {
          console.error('❌ Site rebuild failed');
        }
      });
    } else {
      console.error('❌ News fetch failed');
    }
  });
}, {
  scheduled: true,
  timezone: "UTC"
});

// Watch for changes in content directory and rebuild when needed
const contentDir = path.join(process.cwd(), 'content');
if (fs.existsSync(contentDir)) {
  fs.watch(contentDir, { recursive: true }, (eventType, filename) => {
    console.log(`\n📝 Content change detected: ${eventType} ${filename}`);
    
    // Debounce multiple rapid changes
    if (typeof rebuildTimer !== 'undefined') {
      clearTimeout(rebuildTimer);
    }
    
    rebuildTimer = setTimeout(() => {
      console.log('🔄 Rebuilding site due to content change...');
      const buildProcess = spawn('node', ['scripts/build-for-gh-pages.mjs'], { stdio: 'inherit' });
      
      buildProcess.on('close', (code) => {
        if (code === 0) {
          console.log('✅ Site rebuilt successfully after content change');
          
          // Push changes to remote
          console.log('📤 Pushing content changes to remote repository...');
          const pushProcess = spawn('node', ['scripts/push-to-remote.mjs'], { stdio: 'inherit' });
          
          pushProcess.on('close', (pushCode) => {
            if (pushCode === 0) {
              console.log('✅ Content changes pushed to remote successfully');
            } else {
              console.error('❌ Failed to push content changes to remote');
            }
          });
        } else {
          console.error('❌ Site rebuild failed after content change');
        }
      });
    }, 2000); // Wait 2 seconds after last change to debounce
  });
  
  console.log('👀 Watching for content changes...');
} else {
  console.log('📁 Content directory not found, skipping content watch');
}

console.log('✅ AI-StartUP scheduler running...');
console.log('⏰ Daily news fetch scheduled for 8:00 AM UTC');
console.log('🤖 Waiting for events...\n');

let rebuildTimer;

// Keep the process alive
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down scheduler...');
  process.exit(0);
});