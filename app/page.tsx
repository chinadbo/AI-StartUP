'use client';

import { useState, useEffect } from 'react';
import { FileText, Newspaper, Lightbulb, Clock, Eye, MessageCircle, Share2 } from 'lucide-react';

// Simple component implementations to avoid dependency on shadcn/ui
const Button = ({ 
  children, 
  variant = "default", 
  size = "default", 
  className = "", 
  onClick,
  type
}: any) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline"
  };
  
  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10"
  };
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

// Mock data - in a real app, this would come from our content directory
const mockNews = [
  {
    id: 1,
    title: "Breakthrough in Large Language Models Architecture",
    summary: "Researchers have developed a new transformer architecture that reduces computational requirements by 40% while maintaining performance.",
    date: "2026-01-31",
    source: "AI Research Journal",
    category: "Research",
    readTime: "4 min read"
  },
  {
    id: 2,
    title: "New AI Ethics Guidelines Released by Major Consortium",
    summary: "A coalition of tech companies and academic institutions has published comprehensive ethical guidelines for AI development.",
    date: "2026-01-31",
    source: "Tech Ethics Review",
    category: "Ethics",
    readTime: "3 min read"
  },
  {
    id: 3,
    title: "Advances in Computer Vision Technology",
    summary: "New computer vision models show unprecedented accuracy in identifying objects in complex environments.",
    date: "2026-01-30",
    source: "Vision AI Quarterly",
    category: "Computer Vision",
    readTime: "5 min read"
  }
];

const mockIdeas = [
  {
    id: 1,
    title: "Personalized AI Tutor System",
    description: "An AI-powered tutoring system that adapts to individual learning styles and paces",
    votes: 24,
    status: "researching"
  },
  {
    id: 2,
    title: "AI-Powered Medical Diagnosis Assistant",
    description: "A diagnostic tool that helps doctors identify rare diseases more accurately",
    votes: 42,
    status: "prototyping"
  },
  {
    id: 3,
    title: "Autonomous Drone Delivery Network",
    description: "A swarm intelligence system for efficient urban delivery using drones",
    votes: 18,
    status: "conceived"
  }
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [ideaCount, setIdeaCount] = useState(0);
  const [articleCount, setArticleCount] = useState(0);
  const [newIdea, setNewIdea] = useState('');
  const [newArticleUrl, setNewArticleUrl] = useState('');

  useEffect(() => {
    // Simulate loading data
    setNewsItems(mockNews);
    setIdeaCount(mockIdeas.length);
    setArticleCount(8); // Mock value
  }, []);

  const handleAddIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIdea.trim()) {
      alert(`Idea saved: "${newIdea}"`);
      setNewIdea('');
      setIdeaCount(ideaCount + 1);
    }
  };

  const handleAddArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (newArticleUrl.trim()) {
      alert(`Article URL submitted: "${newArticleUrl}"`);
      setNewArticleUrl('');
      setArticleCount(articleCount + 1);
    }
  };

  // Simple component implementations to avoid dependency on shadcn/ui
  const Button = ({ 
    children, 
    variant = "default", 
    size = "default", 
    className = "", 
    onClick,
    type
  }: any) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
    
    const variantClasses = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline"
    };
    
    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10"
    };
    
    return (
      <button
        type={type}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  const Card = ({ children, className = "" }) => (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
      {children}
    </div>
  );

  const CardHeader = ({ children, className = "" }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
      {children}
    </div>
  );

  const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h3>
  );

  const CardDescription = ({ children, className = "" }) => (
    <p className={`text-sm text-muted-foreground ${className}`}>
      {children}
    </p>
  );

  const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );

  const Input = ({ className = "", ...props }) => (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );

  const Textarea = ({ className = "", ...props }) => (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
              <Lightbulb className="text-white h-6 w-6" />
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
                Explore the Future of AI
              </h2>
              <p className="text-xl max-w-2xl mx-auto opacity-90">
                Your central hub for tracking AI innovations, news, and breakthrough ideas shaping tomorrow.
              </p>
            </section>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardDescription className="text-gray-600 dark:text-gray-300">AI Ideas</CardDescription>
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50">
                    <Lightbulb className="text-blue-600 h-5 w-5" />
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
                    <Newspaper className="text-green-600 h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">{newsItems.length}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardDescription className="text-gray-600 dark:text-gray-300">Articles Analyzed</CardDescription>
                  <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/50">
                    <FileText className="text-purple-600 h-5 w-5" />
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
                <h3 className="text-2xl font-bold">Latest AI News</h3>
                <Button variant="outline" className="flex items-center">
                  <Newspaper className="mr-2 h-4 w-4" />
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
                          {item.category}
                        </span>
                      </div>
                      <div className="flex text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>{item.date}</span>
                        <span className="mx-2">•</span>
                        <span>{item.readTime}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{item.summary}</p>
                    </div>
                    <div className="px-5 pb-5 flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">Read More</Button>
                      <Button variant="secondary" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
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
                <Newspaper className="mr-2 h-4 w-4" />
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
                        {item.category}
                      </span>
                    </div>
                    <div className="flex text-sm text-gray-500 dark:text-gray-400 my-3">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{item.date}</span>
                      <span className="mx-2">•</span>
                      <span>{item.readTime}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{item.summary}</p>
                  </div>
                  <div className="px-5 pb-5 mt-auto">
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">Read Full Article</Button>
                      <Button variant="secondary">
                        <Eye className="h-4 w-4" />
                      </Button>
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
                <Lightbulb className="mr-2 h-4 w-4" />
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
                    <form onSubmit={handleAddIdea} className="space-y-4">
                      <Input
                        placeholder="Idea title..."
                        value={newIdea}
                        onChange={(e) => setNewIdea(e.target.value)}
                      />
                      <Textarea
                        placeholder="Describe your AI idea..."
                        className="min-h-[120px]"
                      />
                      <div className="flex justify-end">
                        <Button type="submit">Save Idea</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Recent Ideas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockIdeas.map((idea) => (
                        <div key={idea.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                          <div>
                            <h4 className="font-medium">{idea.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{idea.description}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <MessageCircle className="mr-1 h-4 w-4" />
                              {idea.votes}
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              idea.status === 'conceived' ? 'bg-yellow-100 text-yellow-800' :
                              idea.status === 'researching' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {idea.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
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
                <h2 className="text-2xl font-bold">Article Analysis</h2>
                <p className="text-gray-600 dark:text-gray-400">Analyze and summarize AI articles</p>
              </div>
              <Button className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Add Article
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Analyze New Article</CardTitle>
                    <CardDescription>Submit an article URL for AI-powered analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddArticle} className="space-y-4">
                      <Input
                        placeholder="Paste article URL here..."
                        value={newArticleUrl}
                        onChange={(e) => setNewArticleUrl(e.target.value)}
                      />
                      <div className="flex justify-end">
                        <Button type="submit">Analyze Article</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Recent Analyses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((id) => (
                        <Card key={id} className="p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between">
                            <h4 className="font-medium">Analysis of Recent AI Paper: "Transformers Reimagined"</h4>
                            <span className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full">
                              Technical
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            Summary: This paper proposes a novel attention mechanism that significantly reduces computational complexity...
                          </p>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-3">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>2 hours ago</span>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Analysis Stats</CardTitle>
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