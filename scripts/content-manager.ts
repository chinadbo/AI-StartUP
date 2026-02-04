import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

type ContentType = 'articles' | 'ideas' | 'news' | 'notes';

interface ContentMetadata {
  title: string;
  date: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
  author?: string;
  readTime?: string;
  [key: string]: any;
}

interface ContentItem {
  id: string;
  slug: string;
  content: string;
  metadata: ContentMetadata;
  filePath: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Creates a new content file
 */
export async function createContent(
  type: ContentType,
  slug: string,
  metadata: ContentMetadata,
  content: string
): Promise<void> {
  const dirPath = path.join(CONTENT_DIR, type);
  const filePath = path.join(dirPath, `${slug}.md`);
  
  // Ensure directory exists
  await fs.mkdir(dirPath, { recursive: true });
  
  // Combine metadata and content
  const fileContent = matter.stringify(content, metadata);
  
  // Write file
  await fs.writeFile(filePath, fileContent);
  console.log(`Created ${type}/${slug}.md`);
}

/**
 * Analyzes content from a given text and creates appropriate markdown file
 */
export async function analyzeAndCreateContent(
  type: ContentType,
  title: string,
  content: string,
  additionalMetadata: Partial<ContentMetadata> = {}
): Promise<void> {
  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();

  // Create metadata
  const metadata: ContentMetadata = {
    title,
    date: new Date().toISOString().split('T')[0],
    excerpt: content.substring(0, 150) + '...',
    ...additionalMetadata
  };

  // Calculate read time (rough estimate: 200 words per minute)
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);
  metadata.readTime = `${readTime} min read`;

  await createContent(type, slug, metadata, content);
}

/**
 * Lists all content of a specific type
 */
export async function listContent(type: ContentType): Promise<ContentItem[]> {
  const typeDir = path.join(CONTENT_DIR, type);
  
  if (!await fs.stat(typeDir).catch(() => false)) {
    console.log(`Directory ${typeDir} does not exist.`);
    return [];
  }
  
  const fileNames = await fs.readdir(typeDir);
  const contentItems = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(async fileName => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(typeDir, fileName);
        const fileContents = await fs.readFile(fullPath, 'utf8');
        
        const { data, content } = matter(fileContents);
        
        return {
          id: `${type}-${slug}`,
          slug,
          content,
          metadata: {
            title: data.title || slug,
            date: data.date || new Date().toISOString().split('T')[0],
            excerpt: data.excerpt || data.description || content.substring(0, 150) + '...',
            category: data.category || type,
            tags: Array.isArray(data.tags) ? data.tags : (typeof data.tags === 'string' ? [data.tags] : []),
            author: data.author,
            readTime: data.readTime,
            ...data
          },
          filePath: fullPath
        };
      })
  );
  
  // Sort by date (newest first)
  return contentItems.sort((a, b) => 
    new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );
}

/**
 * Gets content statistics
 */
export async function getContentStats(): Promise<Record<ContentType, number>> {
  const stats: Record<ContentType, number> = {
    articles: 0,
    ideas: 0,
    news: 0,
    notes: 0
  };
  
  for (const type of Object.keys(stats) as ContentType[]) {
    const items = await listContent(type);
    stats[type] = items.length;
  }
  
  return stats;
}

// Example usage when running as a script
if (require.main === module) {
  console.log('Content Manager - Helper functions for managing AI-StartUP content');
  console.log('\nAvailable functions:');
  console.log('- createContent(type, slug, metadata, content)');
  console.log('- analyzeAndCreateContent(type, title, content, additionalMetadata?)');
  console.log('- listContent(type)');
  console.log('- getContentStats()');
}