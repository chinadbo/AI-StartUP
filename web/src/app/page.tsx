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
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI-StartUP
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Your AI Innovation Hub</p>
            </div>
          </div>
          <nav>
            <ul className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {['dashboard', 'news', 'ideas', 'articles'].map((tab) => (
                <li key={tab}>
                  <Button
                    variant="ghost"
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-md capitalize ${activeTab === tab ? 'bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                  >
                    {tab}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <section className="text-center py-12 px-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">
                Welcome to AI-StartUP
              </h2>
              <p className="text-xl max-w-2xl mx-auto opacity-90">
                Your central hub for exploring, tracking and managing the latest AI innovations and news.
              </p>
            </section>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardDescription className="text-gray-600 dark:text-gray-300">Ideas Captured</CardDescription>
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 h-5 w-5">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 12h8"></path>
                      <path d="M12 8h.01"></path>
                      <path d="M12 16h.01"></path>
                    </svg>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{ideaCount}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardDescription className="text-gray-600 dark:text-gray-300">Latest News</CardDescription>
                  <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 h-5 w-5">
                      <path d="M4 12h16"></path>
                      <path d="M4 18h16"></path>
                      <path d="M4 6h16"></path>
                    </svg>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">{newsItems.length}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardDescription className="text-gray-600 dark:text-gray-300">Articles Summarized</CardDescription>
                  <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 h-5 w-5">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{articleCount}</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Recent AI News</h3>
                <Button variant="outline" className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                    <path d="M16 16h5v5"></path>
                  </svg>
                  View All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                    <div className="p-5 flex-grow">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg mb-2">{item.title}</CardTitle>
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                          {item.source}
                        </span>
                      </div>
                      <div className="flex text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span>{item.date}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{item.excerpt}</p>
                    </div>
                    <div className="px-5 pb-5 flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">Read More</Button>
                      <Button variant="secondary" size="sm">Save</Button>
                    </div>
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
              <div>
                <h2 className="text-2xl font-bold">AI News Feed</h2>
                <p className="text-gray-600 dark:text-gray-400">Latest developments in artificial intelligence</p>
              </div>
              <Button className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                  <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Refresh News
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsItems.map((item) => (
                <Card key={item.id} className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                  <div className="p-5 flex-grow">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                        {item.source}
                      </span>
                    </div>
                    <div className="flex text-sm text-gray-500 dark:text-gray-400 my-3">
                      <span>{item.date}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{item.excerpt}</p>
                  </div>
                  <div className="px-5 pb-5 mt-auto">
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">Read More</Button>
                      <Button variant="secondary">Save</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Ideas Tab */}
        {activeTab === 'ideas' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold">AI Ideas</h2>
                <p className="text-gray-600 dark:text-gray-400">Capture and develop your AI concepts</p>
              </div>
              <Button className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add New Idea
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
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
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Recent Ideas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400 text-center py-6">
                      No ideas captured yet. Add your first idea above.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Top Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: 'Natural Language Processing', count: 12 },
                        { name: 'Computer Vision', count: 8 },
                        { name: 'Robotics', count: 5 },
                        { name: 'Ethics', count: 7 },
                        { name: 'Healthcare', count: 4 },
                        { name: 'Finance', count: 6 }
                      ].map((category, index) => (
                        <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                          <span>{category.name}</span>
                          <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                            {category.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Implemented</span>
                        <span className="font-medium">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span>In Progress</span>
                        <span className="font-medium">5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Researching</span>
                        <span className="font-medium">4</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold">Article Summaries</h2>
                <p className="text-gray-600 dark:text-gray-400">Summarize and analyze AI articles</p>
              </div>
              <Button className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Article
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
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
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Recent Articles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400 text-center py-6">
                      No articles summarized yet. Add an article URL to generate a summary.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Summary Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Avg. Summary Length</span>
                          <span className="text-sm font-medium">3 min read</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Accuracy Rate</span>
                          <span className="text-sm font-medium">92%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Topics Covered</span>
                          <span className="text-sm font-medium">15</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Popular Sources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: 'Nature AI', count: 24 },
                        { name: 'AI Research', count: 18 },
                        { name: 'TechCrunch AI', count: 15 },
                        { name: 'MIT Tech Review', count: 12 },
                        { name: 'Google AI Blog', count: 10 }
                      ].map((source, index) => (
                        <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                          <span className="text-sm">{source.name}</span>
                          <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                            {source.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>AI-StartUP Dashboard • Stay updated with the latest in AI • {new Date().getFullYear()}</p>
          <div className="mt-2 flex justify-center space-x-6">
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Documentation</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">API</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">GitHub</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}