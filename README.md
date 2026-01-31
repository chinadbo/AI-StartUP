# AI-StartUP

AI Start Up - A repository for exploring AI technologies, news, and ideas

## Overview

This project serves as a hub for AI exploration, featuring:
- Daily AI news summaries
- Ideas and concepts for AI applications
- Article analysis and insights
- Technical discoveries and breakthroughs
- Modern web dashboard for easy management

## Structure

- `ideas/` - Ideas and concepts for AI applications
- `news/` - Daily AI news summaries
- `daily_updates/` - Daily AI technology updates
- `articles/` - Analysis of AI articles and papers
- `scripts/` - Scripts for automating news gathering and analysis
- `web/` - Modern web dashboard for managing content

## Features

- Automated daily AI news retrieval
- Article summarization capabilities
- Idea tracking and development
- AI technology trend monitoring
- Modern web interface with dashboard

## Web Dashboard

The project includes a modern, tech-focused dashboard built with Next.js, Tailwind CSS, and shadcn-inspired components.

### Accessing the Dashboard

To run the dashboard locally:
1. Navigate to the web directory: `cd web`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Visit `http://localhost:3000` in your browser

### Deploying to GitHub Pages

The dashboard is configured for static export to GitHub Pages:
1. Run the build script: `./build-for-gh-pages.sh`
2. Push the contents of the `out` directory to your `gh-pages` branch

## Scripts

- `scripts/daily_news_fetcher.js` - Creates daily news files
- `scripts/article_summarizer.js` - Creates templates for article summaries
- `scripts/setup_cron.sh` - Sets up the daily cron job