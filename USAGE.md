# AI-StartUP Usage Guide

## Overview

This project is designed to help you track AI developments, record ideas, and summarize articles.

## Directory Structure

- `ideas/` - Store and develop AI-related ideas
- `news/` - Daily AI news summaries (automatically generated)
- `daily_updates/` - Manual daily updates and observations
- `articles/` - Summaries of articles you've read
- `scripts/` - Automation scripts

## Daily News Automation

The system automatically creates a new news file each day at 8:00 AM. To set this up:

1. Run the setup script: `./scripts/setup_cron.sh`

## Adding Ideas

To add a new idea, create a file in the `ideas/` directory using the template provided in `ideas/template.md`.

## Summarizing Articles

To create a summary for an article:

```bash
node scripts/article_summarizer.js <url> [title]
```

Example:
```bash
node scripts/article_summarizer.js https://example.com/ai-article "New AI Breakthrough"
```

## Manual Daily Updates

Create a file in `daily_updates/` with the date in the filename (e.g., `2026-01-31.md`) to record your daily AI observations.

## Scripts

- `daily_news_fetcher.js` - Creates daily news files
- `article_summarizer.js` - Creates templates for article summaries
- `setup_cron.sh` - Sets up the daily cron job