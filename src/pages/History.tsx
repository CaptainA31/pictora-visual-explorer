
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Search, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock history data
const mockHistory = [
  {
    id: 'history1',
    type: 'image',
    title: 'Eiffel Tower',
    category: 'landmark',
    date: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'history2',
    type: 'text',
    title: 'Red fox in forest',
    category: 'animal',
    date: '1 day ago',
    image: 'https://images.unsplash.com/photo-1520561805070-83c413349512?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'history3',
    type: 'image',
    title: 'Great Wall of China',
    category: 'landmark',
    date: '3 days ago',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'history4',
    type: 'text',
    title: 'Blue whales in ocean',
    category: 'animal',
    date: '1 week ago',
    image: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?q=80&w=300&auto=format&fit=crop',
  },
];

const History = () => {
  const navigate = useNavigate();

  const handleItemClick = (item: any) => {
    navigate('/results', {
      state: {
        searchType: item.type,
        imageUrl: item.type === 'image' ? item.image : undefined,
        searchQuery: item.type === 'text' ? item.title : undefined,
      },
    });
  };

  const HistoryItem = ({ item }: { item: any }) => (
    <Card className="overflow-hidden border-pictora-teal/20 hover:border-pictora-teal/50 transition-all cursor-pointer group">
      <CardContent className="p-0" onClick={() => handleItemClick(item)}>
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-1/3 h-24 sm:h-auto">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="p-4 sm:w-2/3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.category === 'landmark' 
                    ? 'bg-pictora-teal/20 text-pictora-teal' 
                    : 'bg-pictora-coral/20 text-pictora-coral'
                }`}>
                  {item.category}
                </span>
                <span className="text-xs text-pictora-teal/60">{item.date}</span>
              </div>
              <h3 className="font-medium text-pictora-teal group-hover:text-pictora-lightTeal transition-colors">{item.title}</h3>
            </div>
            <div className="flex items-center mt-2">
              {item.type === 'image' ? (
                <span className="text-xs flex items-center text-pictora-teal/70">
                  <Search className="h-3 w-3 mr-1" /> Image Search
                </span>
              ) : (
                <span className="text-xs flex items-center text-pictora-teal/70">
                  <Search className="h-3 w-3 mr-1" /> Text Search
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container px-4 py-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-pictora-teal mr-2" />
          <h1 className="text-2xl md:text-3xl font-bold text-pictora-teal font-playfair">Your Search History</h1>
        </div>
        <Button variant="outline" className="border-pictora-teal/30 text-pictora-teal hover:bg-pictora-teal/10">
          <Trash2 className="h-4 w-4 mr-2" /> Clear All
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="bg-pictora-teal/10 text-pictora-teal">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="landmarks">Landmarks</TabsTrigger>
          <TabsTrigger value="animals">Animals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <div className="space-y-4">
            {mockHistory.map((item) => (
              <HistoryItem key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="landmarks" className="mt-4">
          <div className="space-y-4">
            {mockHistory
              .filter((item) => item.category === 'landmark')
              .map((item) => (
                <HistoryItem key={item.id} item={item} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="animals" className="mt-4">
          <div className="space-y-4">
            {mockHistory
              .filter((item) => item.category === 'animal')
              .map((item) => (
                <HistoryItem key={item.id} item={item} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {mockHistory.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-pictora-teal/10 inline-flex rounded-full p-4 mb-4">
            <Clock className="h-6 w-6 text-pictora-teal" />
          </div>
          <h3 className="text-xl font-medium text-pictora-teal mb-2">No history yet</h3>
          <p className="text-pictora-teal/70 mb-6">Your search history will appear here</p>
          <Button onClick={() => navigate('/')} className="bg-pictora-teal hover:bg-pictora-lightTeal">
            Start Exploring
          </Button>
        </div>
      )}
    </div>
  );
};

export default History;
