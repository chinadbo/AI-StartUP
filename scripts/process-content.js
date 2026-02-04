#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Process and analyze content from a given text input
 * @param {string} content - Raw text content to analyze
 * @param {string} type - Content type (articles, ideas, news, notes)
 * @param {string} title - Title for the content
 * @returns {Object} - Processed content with metadata
 */
function analyzeAndCreateMarkdown(content, type, title) {
  // Extract key information from the content
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const firstSentence = sentences[0]?.trim() || '';
  const excerpt = content.substring(0, 200) + (content.length > 200 ? '...' : '');
  
  // Generate tags based on content analysis
  const tags = [];
  if (content.toLowerCase().includes('ai') || content.toLowerCase().includes('artificial intelligence')) {
    tags.push('ai');
  }
  if (content.toLowerCase().includes('technology') || content.toLowerCase().includes('tech')) {
    tags.push('technology');
  }
  if (content.toLowerCase().includes('innovation') || content.toLowerCase().includes('startup')) {
    tags.push('innovation');
  }
  
  // Determine category based on content
  let category = type.charAt(0).toUpperCase() + type.slice(1);
  if (type === 'news' && content.toLowerCase().includes('research')) {
    category = 'Research';
  } else if (type === 'articles' && content.toLowerCase().includes('tutorial')) {
    category = 'Tutorial';
  }
  
  // Estimate reading time (200 words per minute)
  const wordCount = content.split(/\s+/).length;
  const readTime = `${Math.ceil(wordCount / 200)} min read`;
  
  const markdownContent = `---
title: "${title}"
date: "${new Date().toISOString().split('T')[0]}"
excerpt: "${excerpt}"
category: "${category}"
tags: [${tags.map(t => `"${t}"`).join(', ')}]
author: "AI-StartUP Analyzer"
readTime: "${readTime}"
---

${content}
`;

  return {
    content: markdownContent,
    metadata: {
      title,
      date: new Date().toISOString().split('T')[0],
      excerpt,
      category,
      tags,
      author: "AI-StartUP Analyzer",
      readTime
    }
  };
}

/**
 * Save content to the appropriate directory
 */
function saveContent(content, type, filename) {
  const dir = path.join(process.cwd(), 'content', type);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const filepath = path.join(dir, `${filename}.md`);
  fs.writeFileSync(filepath, content);
  console.log(`Saved content to: ${filepath}`);
  return filepath;
}

// Main function to process input
async function processInput(input, type = 'articles', customTitle = null) {
  if (!input || typeof input !== 'string' || input.trim().length === 0) {
    throw new Error('Input must be a non-empty string');
  }
  
  // Clean up the input
  const cleanedInput = input.trim();
  
  // Generate title if not provided
  const title = customTitle || cleanedInput.substring(0, 50).replace(/[^\w\s-]/g, '') + '...';
  
  // Analyze and create markdown
  const result = analyzeAndCreateMarkdown(cleanedInput, type, title);
  
  // Create a safe filename
  const filename = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50)
    .replace(/-+$/, '');
  
  // Save the content
  const filepath = saveContent(result.content, type, filename);
  
  return {
    filepath,
    metadata: result.metadata,
    type,
    success: true
  };
}

// Export the function for use in other modules
export { processInput, analyzeAndCreateMarkdown };

// Handle command line execution
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('Usage: node process-content.js <type> <title> [content-file-path]');
    console.log('Types: articles, ideas, news, notes');
    process.exit(1);
  }
  
  const type = args[0];
  const title = args[1];
  const contentPath = args[2];
  
  if (!['articles', 'ideas', 'news', 'notes'].includes(type)) {
    console.error('Invalid type. Must be one of: articles, ideas, news, notes');
    process.exit(1);
  }
  
  let content;
  
  if (contentPath) {
    if (!fs.existsSync(contentPath)) {
      console.error(`File does not exist: ${contentPath}`);
      process.exit(1);
    }
    content = fs.readFileSync(contentPath, 'utf8');
  } else {
    // Read from stdin
    content = fs.readFileSync(0, 'utf-8'); // 0 is stdin
  }
  
  processInput(content, type, title)
    .then(result => {
      console.log('Content processed successfully!');
      console.log(JSON.stringify(result, null, 2));
    })
    .catch(err => {
      console.error('Error processing content:', err.message);
      process.exit(1);
    });
}