import { notFound } from 'next/navigation';
import { getContentBySlug, ContentItem, ContentType } from '@/lib/content-loader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';

// Components to be used in MDX
const components = {
  h1: ({ children }: { children: React.ReactNode }) => <h1 className="text-3xl font-bold mt-6 mb-4">{children}</h1>,
  h2: ({ children }: { children: React.ReactNode }) => <h2 className="text-2xl font-semibold mt-5 mb-3">{children}</h2>,
  h3: ({ children }: { children: React.ReactNode }) => <h3 className="text-xl font-medium mt-4 mb-2">{children}</h3>,
  p: ({ children }: { children: React.ReactNode }) => <p className="my-3 leading-relaxed">{children}</p>,
  ul: ({ children }: { children: React.ReactNode }) => <ul className="list-disc pl-6 my-3">{children}</ul>,
  ol: ({ children }: { children: React.ReactNode }) => <ol className="list-decimal pl-6 my-3">{children}</ol>,
  li: ({ children }: { children: React.ReactNode }) => <li className="my-1">{children}</li>,
  blockquote: ({ children }: { children: React.ReactNode }) => <blockquote className="border-l-4 border-primary pl-4 italic my-4 py-1">{children}</blockquote>,
  code: ({ children }: { children: React.ReactNode }) => <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>,
  pre: ({ children }: { children: React.ReactNode }) => <pre className="bg-muted p-4 rounded-lg my-4 overflow-x-auto text-sm font-mono">{children}</pre>,
  a: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a href={href} className="text-primary hover:underline">
      {children}
    </a>
  ),
  strong: ({ children }: { children: React.ReactNode }) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }: { children: React.ReactNode }) => <em className="italic">{children}</em>,
};

interface Params {
  type: ContentType;
  slug: string;
}

interface Props {
  params: Promise<Params>;
}

export default async function ContentPage({ params }: Props) {
  const { type, slug } = await params;
  
  // Validate content type
  if (!['articles', 'ideas', 'news', 'notes'].includes(type)) {
    notFound();
  }
  
  const content = await getContentBySlug(type, slug);
  
  if (!content) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link href={`/${type}`}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to {type}
            </Link>
          </Button>
          <h1 className="text-xl font-bold">AI-StartUP</h1>
          <div className="w-12"></div> {/* Spacer for alignment */}
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="prose prose-lg dark:prose-invert mx-auto">
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <span>{content.metadata.date}</span>
              {content.metadata.category && (
                <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs">
                  {content.metadata.category}
                </span>
              )}
              {content.metadata.readTime && (
                <span>{content.metadata.readTime}</span>
              )}
            </div>
            <h1 className="text-4xl font-bold mb-4">{content.metadata.title}</h1>
            {content.metadata.excerpt && (
              <p className="text-xl text-muted-foreground">{content.metadata.excerpt}</p>
            )}
          </header>
          
          <div className="prose-content">
            <MDXRemote source={content.content} components={components} />
          </div>
        </article>
      </main>
    </div>
  );
}