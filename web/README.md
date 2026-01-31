# AI-StartUP Dashboard

A modern, tech-focused dashboard for exploring and managing AI innovations, news, and ideas.

## Features

- **Dashboard Overview**: View stats and recent activity
- **News Feed**: Browse latest AI news and developments
- **Idea Management**: Capture and track AI concepts
- **Article Summaries**: Summarize and store articles
- **Responsive Design**: Works on all device sizes
- **Dark/Light Mode**: Automatic theme switching

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom gradients and effects
- **UI Components**: Custom implementation of shadcn/ui principles
- **Deployment**: Static export for GitHub Pages

## Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to GitHub Pages

1. Build the static site:
```bash
npm run build
```

Or use the build script:
```bash
./build-for-gh-pages.sh
```

2. The built site will be in the `out` directory

3. Push the contents of the `out` directory to your GitHub repository's `gh-pages` branch

## Architecture

- `/src/app` - Main application pages and components
- `/src/components/ui` - Reusable UI components
- `/src/lib/utils.ts` - Utility functions
- `/public` - Static assets

## Integration

This dashboard connects to the AI-StartUP project structure:
- News data is stored in `/news/` directory
- Ideas are managed in `/ideas/` directory
- Article summaries go to `/articles/` directory

## Customization

The dashboard is easily customizable:
- Colors can be modified in `src/app/globals.css`
- Layout adjustments can be made in `src/app/layout.tsx`
- New features can be added in `src/app/page.tsx`