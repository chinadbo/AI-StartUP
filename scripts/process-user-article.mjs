#!/usr/bin/env node

/**
 * AI-StartUP User Article Processor
 * 
 * Processes user-submitted articles for analysis and adds them to the content repository
 */

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock function to simulate analyzing an article
// In a real implementation, this would use NLP or AI services
async function analyzeArticle(content, title = 'Untitled') {
  console.log(`🔍 Analyzing article: ${title}`);
  
  // Simulated analysis
  const analysis = {
    title: title || 'Untitled Article',
    summary: `This article discusses key aspects of AI technology, including advancements in machine learning, ethical considerations, and practical applications. The content covers recent developments in the field and provides insights into future trends.`,
    keyPoints: [
      "Main topic related to AI advancement",
      "Technical insights and methodology",
      "Implications for industry or society",
      "Future directions or recommendations"
    ],
    category: "AI Research",
    date: new Date().toISOString(),
    wordCount: content.split(' ').length,
    readingTime: Math.ceil(content.split(' ').length / 200) // Average reading speed
  };

  // Ensure the articles directory exists
  const articlesDir = path.join(__dirname, '../content/articles');
  await fs.ensureDir(articlesDir);

  // Generate a filename based on the title and date
  const cleanTitle = title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  const fileName = `${new Date().toISOString().split('T')[0]}_${cleanTitle}.json`;
  const articleFilePath = path.join(articlesDir, fileName);
  
  await fs.writeJson(articleFilePath, { content, analysis }, { spaces: 2 });

  console.log(`✅ Saved article analysis to ${articleFilePath}`);
  
  return analysis;
}

// Process command line arguments
const args = process.argv.slice(2);

if (args.length < 1) {
  console.error('❌ Usage: node process-user-article.mjs "<article_content>" "[title]"');
  process.exit(1);
}

const content = args[0];
const title = args[1] || 'User Submitted Article';

async function processUserArticle() {
  try {
    console.log('🚀 Starting user article processing...');
    
    // Analyze the article
    const result = await analyzeArticle(content, title);
    
    console.log('✅ Article processed successfully!');
    console.log(`📋 Title: ${result.title}`);
    console.log(`⏱️  Reading time: ${result.readingTime} min`);
    console.log(`📊 Word count: ${result.wordCount}`);
    console.log(`🏷️  Category: ${result.category}`);
    
    // Build the website with the new content
    console.log('\n🔄 Building site with new article...');
    const buildProcess = spawn('node', ['../scripts/build-for-gh-pages.mjs'], { stdio: 'inherit' });
    
    buildProcess.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Site built successfully with new article');
        
        // Push changes to remote repository
        console.log('\n📤 Pushing changes to remote repository...');
        const pushProcess = spawn('node', ['../scripts/push-to-remote.mjs'], { stdio: 'inherit' });
        
        pushProcess.on('close', (pushCode) => {
          if (pushCode === 0) {
            console.log('✅ Changes pushed to remote successfully');
          } else {
            console.error('❌ Failed to push changes to remote');
            process.exit(1);
          }
        });
      } else {
        console.error('❌ Site build failed');
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('❌ Failed to process user article:', error.message);
    process.exit(1);
  }
}

processUserArticle();