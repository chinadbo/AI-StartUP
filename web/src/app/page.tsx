'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [ideaCount, setIdeaCount] = useState(0);
  const [articleCount, setArticleCount] = useState(0);
  const [newIdea, setNewIdea] = useState('');
  const [newArticleUrl, setNewArticleUrl] = useState('');

  // Mock data initialization
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setNewsItems([
        { id: 1, title: 'Breakthrough in Large Language Models', date: '2026-01-31', source: 'AI Journal', excerpt: 'Researchers have developed a new technique that significantly reduces training time for large language models.' },
        { id: 2, title: 'New AI Ethics Framework Released', date: '2026-01-30', source: 'Tech Review', excerpt: 'Leading AI companies collaborate on ethical guidelines for deployment of AI systems.' },
        { id: 3, title: 'AI Hardware Acceleration Advancements', date: '2026-01-29', source: 'Hardware Today', excerpt: 'New chip architectures promise 10x performance improvements for neural network computations.' },
      ]);
      setIdeaCount(12);
      setArticleCount(8);
    }, 500);
  }, []);

  const handleAddIdea = () => {
    if (newIdea.trim()) {
      alert(`Idea saved: "${newIdea}"`);
      setNewIdea('');
      setIdeaCount(ideaCount + 1);
    }
  };

  const handleAddArticle = () => {
    if (newArticleUrl.trim()) {
      alert(`Article URL saved: "${newArticleUrl}"`);
      setNewArticleUrl('');
      setArticleCount(articleCount + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold">AI</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI-StartUP
            </h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              {['dashboard', 'news', 'ideas', 'articles'].map((tab) => (
                <li key={tab}>
                  <Button
                    variant="ghost"
                    onClick={() => setActiveTab(tab)}
                    className={`${activeTab === tab ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'}`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <section className="text-center py-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome to AI-StartUP
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Your central hub for exploring, tracking and managing the latest AI innovations and news.
              </p>
            </section>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardDescription>Ideas Captured</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{ideaCount}</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardDescription>Latest News</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400">{newsItems.length}</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardDescription>Articles Summarized</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">{articleCount}</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <section>
              <h3 className="text-2xl font-semibold mb-6">Recent AI News</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <div className="flex text-sm text-gray-500 dark:text-gray-400">
                        <span>{item.date}</span>
                        <span className="mx-2">•</span>
                        <span>{item.source}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300">{item.excerpt}</p>
                      <div className="mt-4 flex space-x-2">
                        <Button variant="outline" size="sm">Read More</Button>
                        <Button variant="secondary" size="sm">Save</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* News Tab */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold">AI News Feed</h2>
              <Button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Refresh News
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsItems.map((item) => (
                <Card key={item.id} className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <div className="flex text-sm text-gray-500 dark:text-gray-400">
                      <span>{item.date}</span>
                      <span className="mx-2">•</span>
                      <span>{item.source}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{item.excerpt}</p>
                    <div className="flex space-x-2 mt-auto">
                      <Button variant="outline" className="flex-1">Read More</Button>
                      <Button variant="secondary">Save</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Ideas Tab */}
        {activeTab === 'ideas' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold">AI Ideas</h2>
              <Button>Add New Idea</Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Capture New Idea</CardTitle>
                <CardDescription>Add your innovative AI concept to track and develop it</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Describe your AI idea..."
                    value={newIdea}
                    onChange={(e) => setNewIdea(e.target.value)}
                    className="min-h-[120px]"
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleAddIdea}>Save Idea</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Ideas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400 text-center py-6">
                    No ideas captured yet. Add your first idea above.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['Natural Language Processing', 'Computer Vision', 'Robotics', 'Ethics', 'Healthcare'].map((category, index) => (
                      <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                        <span>{category}</span>
                        <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded">
                          {Math.floor(Math.random() * 10) + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold">Article Summaries</h2>
              <Button>Add Article</Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Add New Article</CardTitle>
                <CardDescription>Enter the URL of an article to generate a summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Paste article URL here..."
                    value={newArticleUrl}
                    onChange={(e) => setNewArticleUrl(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleAddArticle}>Generate Summary</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400 text-center py-6">
                    No articles summarized yet. Add an article URL to generate a summary.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>AI-StartUP Dashboard • Stay updated with the latest in AI • {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}