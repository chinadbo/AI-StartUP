import { getAllContent, ContentType } from '@/lib/content-loader';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function NotesPage() {
  const notes = await getAllContent('notes');
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Notes</h1>
        <p className="text-muted-foreground">
          Browse all notes in your knowledge base
        </p>
      </div>
      
      {notes.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No notes yet</h3>
          <p className="text-muted-foreground mt-2">
            Start by adding some notes to your content directory
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <Link 
              key={note.id} 
              href={`/content/notes/${note.slug}`}
              className="block"
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{note.metadata.title}</CardTitle>
                  <div className="flex justify-between items-center">
                    <CardDescription>{note.metadata.date}</CardDescription>
                    {note.metadata.readTime && (
                      <Badge variant="secondary">{note.metadata.readTime}</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">
                    {note.metadata.excerpt}
                  </p>
                  {note.metadata.category && (
                    <div className="mt-4">
                      <Badge variant="outline">{note.metadata.category}</Badge>
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