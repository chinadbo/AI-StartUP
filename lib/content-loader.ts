import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define types
export type ContentType = 'articles' | 'ideas' | 'news' | 'notes';

export interface ContentMetadata {
  title: string;
  date: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
  author?: string;
  readTime?: string;
  [key: string]: any;
}

export interface ContentItem {
  id: string;
  slug: string;
  content: string;
  metadata: ContentMetadata;
  filePath: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Get all content items of a specific type
 */
export async function getAllContent(type: ContentType): Promise<ContentItem[]> {
  try {
    const typeDir = path.join(CONTENT_DIR, type);
    
    // Check if directory exists
    if (!fs.existsSync(typeDir)) {
      console.warn(`Directory does not exist: ${typeDir}`);
      return [];
    }
    
    const fileNames = fs.readdirSync(typeDir);
    const allContent = fileNames
      .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
      .map(fileName => {
        const slug = fileName.replace(/\.mdx?$/, '');
        const fullPath = path.join(typeDir, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
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
      });
    
    // Sort by date (newest first)
    return allContent.sort((a, b) => 
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    );
  } catch (error) {
    console.error(`Error loading content for ${type}:`, error);
    return [];
  }
}

/**
 * Get a specific content item by type and slug
 */
export async function getContentBySlug(type: ContentType, slug: string): Promise<ContentItem | null> {
  try {
    const fullPath = path.join(CONTENT_DIR, type, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
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
  } catch (error) {
    console.error(`Error loading content for ${type}/${slug}:`, error);
    return null;
  }
}

/**
 * Get all content types with counts
 */
export async function getContentCounts(): Promise<Record<ContentType, number>> {
  const counts: Record<ContentType, number> = {
    articles: 0,
    ideas: 0,
    news: 0,
    notes: 0
  };
  
  for (const type of Object.keys(counts) as ContentType[]) {
    const items = await getAllContent(type);
    counts[type] = items.length;
  }
  
  return counts;
}

/**
 * Get all unique categories across all content
 */
export async function getAllCategories(): Promise<string[]> {
  const allCategories = new Set<string>();
  
  for (const type of ['articles', 'ideas', 'news', 'notes'] as ContentType[]) {
    const items = await getAllContent(type);
    items.forEach(item => {
      if (item.metadata.category) {
        allCategories.add(item.metadata.category);
      }
      
      if (Array.isArray(item.metadata.tags)) {
        item.metadata.tags.forEach(tag => allCategories.add(tag));
      }
    });
  }
  
  return Array.from(allCategories).sort();
}