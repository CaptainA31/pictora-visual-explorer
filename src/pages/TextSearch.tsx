
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TextSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions] = useState([
    'Eiffel Tower in Paris',
    'Lions in the Serengeti',
    'Giant Sequoia trees',
    'Petra in Jordan',
    'Coral reefs in Great Barrier Reef',
    'Koalas in Australia'
  ]);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/results', { 
        state: { 
          searchQuery,
          searchType: 'text' 
        } 
      });
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    navigate('/results', { 
      state: { 
        searchQuery: suggestion,
        searchType: 'text' 
      } 
    });
  };

  return (
    <div className="container px-4 py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-pictora-teal font-playfair text-center mb-8">
        Discover Through Text
      </h1>
      
      <form onSubmit={handleSearch} className="mb-12">
        <div className="relative">
          <Input
            type="text"
            placeholder="Describe a landmark or animal..."
            className="pl-4 pr-12 py-6 text-lg bg-white border-pictora-teal/30 focus-visible:ring-pictora-teal rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-12 top-1/2 -translate-y-1/2 text-pictora-teal/50 hover:text-pictora-teal"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          <Button 
            type="submit"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-pictora-teal hover:bg-pictora-lightTeal"
            disabled={!searchQuery.trim()}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        <p className="text-sm text-pictora-teal/70 mt-2">
          Try "Taj Mahal in Agra" or "Pandas in China"
        </p>
      </form>

      <div className="mb-16">
        <h2 className="text-xl font-medium text-pictora-teal mb-4">Popular Searches</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              className="flex items-center p-4 bg-white border border-pictora-teal/20 rounded-lg hover:bg-pictora-teal/5 hover:border-pictora-teal/50 transition-colors text-left"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <Search className="h-4 w-4 text-pictora-coral mr-3 flex-shrink-0" />
              <span className="text-pictora-teal">{suggestion}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-pictora-lightTeal/10 rounded-xl p-6">
        <h2 className="text-xl font-medium text-pictora-teal font-playfair mb-3">Search Tips</h2>
        <ul className="space-y-2 text-pictora-teal/80">
          <li className="flex items-start">
            <span className="inline-block h-2 w-2 rounded-full bg-pictora-coral mr-2 mt-2"></span>
            <span>Be specific about locations and features</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block h-2 w-2 rounded-full bg-pictora-coral mr-2 mt-2"></span>
            <span>Include colors and distinctive characteristics</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block h-2 w-2 rounded-full bg-pictora-coral mr-2 mt-2"></span>
            <span>Mention geographical regions for better results</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TextSearch;
