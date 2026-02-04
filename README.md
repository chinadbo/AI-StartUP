# AI-StartUP Knowledge Hub

A modern web application for managing and displaying markdown content organized into articles, ideas, news, and notes.

## Features

- **Content Management**: Organize your knowledge into 4 categories (articles, ideas, news, notes)
- **Modern Tech Stack**: Built with React, Next.js, TypeScript, Tailwind CSS, and shadcn/ui
- **Markdown Support**: Write content in markdown with frontmatter metadata
- **Responsive Design**: Works on desktop and mobile devices
- **Static Export**: Builds to static files in `/docs` directory

## Project Structure

- `/content/articles` - In-depth analytical pieces
- `/content/ideas` - Creative concepts and proposals
- `/content/news` - Latest updates and developments
- `/content/notes` - Personal observations and thoughts
- `/app` - Next.js app router pages
- `/components/ui` - Reusable UI components
- `/lib` - Utility functions

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Visit `http://localhost:3000` in your browser

### Building for Production

To build the static site:

```bash
npm run export
```

The built site will be available in the `/docs` directory, ready to be deployed to any static hosting service.

## Adding Content

Content is stored as markdown files in the respective directories under `/content`. Each file should include frontmatter metadata:

```markdown
---
title: "Your Content Title"
date: "2026-01-01"
excerpt: "Brief description of the content"
category: "Category Name"
tags: ["tag1", "tag2"]
author: "Your Name"
readTime: "5 min read"
---

Your content goes here...

## Section Title

You can use all standard markdown features:

- Lists
- **Bold text**
- [Links](https://example.com)
- Code blocks

```js
console.log('Hello, world!');
```

```

## Content Analysis

To analyze and add new content from an external source, use the content analysis script:

```bash
# Create a temporary file with your content
echo "Your article content here..." > temp_content.md

# Analyze and add to the appropriate category
node scripts/analyze-content.js articles "Article Title" temp_content.md
```

## Customization

- Modify `/app/page.tsx` to customize the homepage
- Add new components to `/components/ui` 
- Adjust styling in `/app/globals.css` and `/tailwind.config.mjs`

## Deployment

The project builds to static files in the `/docs` directory which can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Simply run `npm run export` and deploy the contents of the `/docs` folder.

## License

MIT