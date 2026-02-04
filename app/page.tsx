'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Newspaper, Lightbulb, StickyNote, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sidebar, SidebarHeader, SidebarContent, SidebarItem } from '@/components/ui/sidebar';

// Define types for our content
type ContentType = 'articles' | 'ideas' | 'news' | 'notes';

interface ContentItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime?: string;
}

const mockData: Record<ContentType, ContentItem[]> = {
  articles: [
    {
      id: '1',
      title: 'The Future of Large Language Models',
      excerpt: 'Exploring the evolution of LLMs and their impact on various industries...',
      date: '2026-01-15',
      category: 'Research',
      readTime: '5 min read'
    },
    {
      id: '2',
      title: 'Ethical Considerations in AI Development',
      excerpt: 'Key ethical challenges facing AI developers today...',
      date: '2026-01-10',
      category: 'Ethics',
      readTime: '7 min read'
    }
  ],
  ideas: [
    {
      id: '1',
      title: 'AI-Powered Personal Assistant',
      excerpt: 'A sophisticated personal assistant that learns user preferences...',
      date: '2026-01-20',
      category: 'Productivity'
    },
    {
      id: '2',
      title: 'Automated Code Review System',
      excerpt: 'Using AI to perform intelligent code reviews and suggest improvements...',
      date: '2026-01-18',
      category: 'Development'
    }
  ],
  news: [
    {
      id: '1',
      title: 'New Breakthrough in Natural Language Processing',
      excerpt: 'Researchers achieve new benchmarks in language understanding...',
      date: '2026-02-01',
      category: 'NLP',
      readTime: '3 min read'
    },
    {
      id: '2',
      title: 'Major Investment in AI Safety Research',
      excerpt: 'Leading tech companies pledge $1 billion to AI safety initiatives...',
      date: '2026-01-28',
      category: 'Funding',
      readTime: '2 min read'
    }
  ],
  notes: [
    {
      id: '1',
      title: 'Meeting Notes: AI Strategy Q1',
      excerpt: 'Key points from the quarterly AI strategy meeting...',
      date: '2026-01-25',
      category: 'Strategy'
    },
    {
      id: '2',
      title: 'Research Findings: Model Optimization',
      excerpt: 'Summary of experiments on improving model efficiency...',
      date: '2026-01-22',
      category: 'Research'
    }
  ]
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<ContentType>('articles');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [contentItems, setContentItems] = useState<ContentItem[]>(mockData.articles);

  useEffect(() => {
    setContentItems(mockData[activeTab]);
  }, [activeTab]);

  const navItems = [
    { id: 'articles', label: 'Articles', icon: FileText },
    { id: 'ideas', label: 'Ideas', icon: Lightbulb },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'notes', label: 'Notes', icon: StickyNote },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <Sidebar className={`${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <SidebarHeader>
          <h1 className="text-xl font-bold">AI-StartUP</h1>
          <p className="text-sm text-muted-foreground">Knowledge Hub</p>
        </SidebarHeader>
        <SidebarContent>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.id} href={`#${item.id}`} passHref legacyBehavior>
                <a 
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(item.id as ContentType);
                  }}
                >
                  <SidebarItem 
                    active={activeTab === item.id}
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </SidebarItem>
                </a>
              </Link>
            );
          })}
        </SidebarContent>
      </Sidebar>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold capitalize">{activeTab}</h2>
            <p className="text-muted-foreground">
              Browse and manage your {activeTab} collection
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {Object.entries(mockData).map(([key, items]) => (
              <div 
                key={key} 
                className={`p-4 rounded-lg border ${
                  activeTab === key 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-background'
                }`}
              >
                <h3 className="text-lg font-semibold capitalize">{key}</h3>
                <p className="text-2xl font-bold">{items.length}</p>
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentItems.map((item) => (
              <div 
                key={item.id} 
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4">
                    {item.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{item.date}</span>
                    {item.readTime && <span>{item.readTime}</span>}
                  </div>
                </div>
                
                <div className="px-6 py-3 bg-muted border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      // In a real app, this would navigate to the content detail
                      console.log(`Viewing ${item.id}`);
                    }}
                  >
                    Read More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}