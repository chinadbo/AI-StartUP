import { getAllContent, ContentType } from '@/lib/content-loader';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function IdeasPage() {
  const ideas = await getAllContent('ideas');
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Ideas</h1>
        <p className="text-muted-foreground">
          Browse all ideas in your knowledge base
        </p>
      </div>
      
      {ideas.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No ideas yet</h3>
          <p className="text-muted-foreground mt-2">
            Start by adding some ideas to your content directory
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <Link 
              key={idea.id} 
              href={`/content/ideas/${idea.slug}`}
              className="block"
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{idea.metadata.title}</CardTitle>
                  <div className="flex justify-between items-center">
                    <CardDescription>{idea.metadata.date}</CardDescription>
                    {idea.metadata.readTime && (
                      <Badge variant="secondary">{idea.metadata.readTime}</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">
                    {idea.metadata.excerpt}
                  </p>
                  {idea.metadata.category && (
                    <div className="mt-4">
                      <Badge variant="outline">{idea.metadata.category}</Badge>
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