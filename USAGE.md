# Usage Guide

## Development

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Visit `http://localhost:3000`

## Production

1. Build the application:
```bash
npm run build
```

2. The built site will be in the `/docs` directory

## Automation Scripts

### Fetch Daily AI News
```bash
node scripts/fetch-ai-news.js
```

### Analyze an Article
```bash
node scripts/analyze-article.js "Article content here" "Article Title"
```

### Process User Article
```bash
node scripts/process-user-article.js "Article content" "Title"
```

### Run Full Automation Pipeline
```bash
node scripts/auto-deploy.js
```

### Setup Daily Tasks
The system is configured to run daily at 8 AM, fetching new AI news and rebuilding the site.

## Content Management

All content is stored in the `/content` directory:
- `/content/news` - Daily fetched AI news
- `/content/articles` - Analyzed user articles
- `/content/ideas` - Captured AI ideas

## GitHub Pages Deployment

The site is configured to deploy to GitHub Pages using the `/docs` directory as the source.