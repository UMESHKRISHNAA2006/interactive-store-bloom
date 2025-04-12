
import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample product data for search
const searchData = [
  {
    id: "1",
    name: "Minimalist Table Lamp",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    category: "Home Decor",
    price: 89.99,
  },
  {
    id: "2",
    name: "Ergonomic Office Chair",
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    category: "Furniture",
    price: 199.99,
  },
  {
    id: "3",
    name: "Wireless Bluetooth Speaker",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    category: "Electronics",
    price: 79.99,
  },
  {
    id: "4",
    name: "Ceramic Coffee Mug",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    category: "Kitchenware",
    price: 24.99,
  },
  {
    id: "5",
    name: "Cotton Throw Pillow",
    image: "https://images.unsplash.com/photo-1584208124792-85dcb8d6a8bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    category: "Home Decor",
    price: 34.99,
  },
  {
    id: "6",
    name: "Houseplant Collection",
    image: "https://images.unsplash.com/photo-1463320898484-cdee8141c787?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    category: "Plants",
    price: 49.99,
  },
];

// Categories for popular searches
const popularCategories = [
  { name: "Home Decor", url: "/category/home-decor" },
  { name: "Furniture", url: "/category/furniture" },
  { name: "Plants", url: "/category/plants" },
  { name: "Kitchenware", url: "/category/kitchenware" },
  { name: "Electronics", url: "/category/electronics" },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof searchData>([]);
  
  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        const input = document.getElementById('search-input');
        if (input) input.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  // Filter results based on search query
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    const filtered = searchData.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) || 
      item.category.toLowerCase().includes(query.toLowerCase())
    );
    
    setResults(filtered);
  }, [query]);
  
  // Clear search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);
  
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg">Search Products</DialogTitle>
        </DialogHeader>
        
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            id="search-input"
            placeholder="Search for products..."
            className="pl-10 pr-10 py-6"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setQuery('')}
            >
              <X size={18} />
            </button>
          )}
        </div>
        
        {/* Search Results */}
        {query ? (
          <div className="overflow-y-auto max-h-[60vh]">
            <h3 className="font-semibold mb-2">Results for "{query}"</h3>
            
            {results.length > 0 ? (
              <div className="space-y-3">
                {results.map(item => (
                  <Link 
                    key={item.id} 
                    to={`/product/${item.id}`}
                    onClick={handleClose}
                    className="flex items-center space-x-4 p-2 rounded-md hover:bg-secondary transition-colors"
                  >
                    <div className="w-16 h-16 rounded-md bg-gray-100 overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="text-sm text-muted-foreground">{item.category}</div>
                      <div className="font-medium text-mint-500">${item.price.toFixed(2)}</div>
                    </div>
                    <ArrowRight size={16} className="flex-shrink-0 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No results found for "{query}"</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h3 className="font-semibold mb-2">Popular Searches</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {popularCategories.map(category => (
                <Link
                  key={category.name}
                  to={category.url}
                  onClick={handleClose}
                  className="bg-secondary px-3 py-1 rounded-full text-sm hover:bg-mint-100 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            
            <h3 className="font-semibold mb-2">Recent Searches</h3>
            <div className="text-sm text-muted-foreground">
              <p>Your recent searches will appear here</p>
            </div>
          </div>
        )}
        
        <div className="text-xs text-muted-foreground mt-4">
          Press ESC to close
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
