import { getAllContent, ContentType } from '@/lib/content-loader';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function NewsPage() {
  const news = await getAllContent('news');
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">News</h1>
        <p className="text-muted-foreground">
          Browse all news items in your knowledge base
        </p>
      </div>
      
      {news.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No news yet</h3>
          <p className="text-muted-foreground mt-2">
            Start by adding some news to your content directory
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <Link 
              key={item.id} 
              href={`/content/news/${item.slug}`}
              className="block"
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{item.metadata.title}</CardTitle>
                  <div className="flex justify-between items-center">
                    <CardDescription>{item.metadata.date}</CardDescription>
                    {item.metadata.readTime && (
                      <Badge variant="secondary">{item.metadata.readTime}</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">
                    {item.metadata.excerpt}
                  </p>
                  {item.metadata.category && (
                    <div className="mt-4">
                      <Badge variant="outline">{item.metadata.category}</Badge>
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