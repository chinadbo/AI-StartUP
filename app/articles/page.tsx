import { getAllContent, ContentType } from '@/lib/content-loader';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function ArticlesPage() {
  const articles = await getAllContent('articles');
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Articles</h1>
        <p className="text-muted-foreground">
          Browse all articles in your knowledge base
        </p>
      </div>
      
      {articles.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No articles yet</h3>
          <p className="text-muted-foreground mt-2">
            Start by adding some articles to your content directory
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link 
              key={article.id} 
              href={`/content/articles/${article.slug}`}
              className="block"
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{article.metadata.title}</CardTitle>
                  <div className="flex justify-between items-center">
                    <CardDescription>{article.metadata.date}</CardDescription>
                    {article.metadata.readTime && (
                      <Badge variant="secondary">{article.metadata.readTime}</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">
                    {article.metadata.excerpt}
                  </p>
                  {article.metadata.category && (
                    <div className="mt-4">
                      <Badge variant="outline">{article.metadata.category}</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}