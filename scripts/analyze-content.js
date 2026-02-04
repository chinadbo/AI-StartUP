#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { analyzeAndCreateContent } from './content-manager.js';

// Simple command-line interface for analyzing content
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.log('Usage: node analyze-content.js <type> <title> <content_file>');
    console.log('Types: articles, ideas, news, notes');
    process.exit(1);
  }
  
  const [type, title, contentFilePath] = args;
  
  if (!['articles', 'ideas', 'news', 'notes'].includes(type)) {
    console.error('Invalid type. Must be one of: articles, ideas, news, notes');
    process.exit(1);
  }
  
  try {
    // Read content from file
    const content = await fs.readFile(contentFilePath, 'utf8');
    
    // Analyze and create content
    await analyzeAndCreateContent(type, title, content);
    
    console.log(`Content created successfully in /content/${type}/`);
  } catch (error) {
    console.error('Error analyzing content:', error.message);
    process.exit(1);
  }
}

// If you want to use this as an interactive script, uncomment the following:
/*
async function interactiveMode() {
  console.log('AI-StartUP Content Analyzer');
  console.log('=========================');
  
  const readline = await import('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const question = (q) => new Promise(resolve => rl.question(q, resolve));
  
  try {
    const type = await question('Enter content type (articles/ideas/news/notes): ');
    if (!['articles', 'ideas', 'news', 'notes'].includes(type)) {
      console.error('Invalid type');
      rl.close();
      return;
    }
    
    const title = await question('Enter title: ');
    console.log('Enter content (press Ctrl+D when finished):');
    
    let content = '';
    for await (const line of readline.createInterface(process.stdin)) {
      content += line + '\n';
    }
    
    await analyzeAndCreateContent(type, title, content.trim());
    console.log('Content created successfully!');
  } finally {
    rl.close();
  }
}
*/

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error);
}

function fileURLToPath(url) {
  if (typeof url !== 'string') return url;
  if (url.startsWith('file://')) {
    return new URL(url).pathname;
  }
  return url;
}