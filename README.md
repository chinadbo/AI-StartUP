# AI-StartUP

A modern, interactive AI news and innovation platform built with Next.js, Tailwind CSS, and TypeScript.

## Features

- **AI News Aggregation**: Automatically fetches the latest AI news daily
- **Idea Management**: Capture, track, and develop AI concepts
- **Article Analysis**: AI-powered analysis and summarization of articles
- **Modern UI**: Sleek, responsive interface with dark mode support
- **Automated Updates**: Scheduled content updates and deployments

## Tech Stack

- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS
- Lucide React icons
- Node.js automation scripts

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Build the application:
```bash
npm run build
```

3. The built site will be in the `/docs` directory

## Automation Scripts

- `npm run build`: Build the application
- `node scripts/startup.mjs`: Run the full automation pipeline
- `node scripts/fetch-ai-news.mjs`: Fetch latest AI news
- `node scripts/analyze-article.mjs "content" "title"`: Analyze a user-submitted article

## Deployment

The site is configured for GitHub Pages deployment using the `/docs` directory as the source.

## Directory Structure

- `/app` - Next.js app router pages
- `/content` - Fetched news, articles, and ideas
- `/scripts` - Automation scripts
- `/docs` - Generated static site (deployed to GitHub Pages)

## Automation

The platform includes automation for:
1. Daily news fetching at 8 AM
2. Content processing and analysis
3. Automatic site rebuilds when new content is added
4. Deployment to GitHub Pages