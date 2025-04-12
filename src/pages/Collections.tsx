
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    id: 1,
    name: "Summer Essentials",
    description: "Refresh your home with our curated summer collection, featuring bright colors and natural materials.",
    image: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=500",
    itemCount: 24,
    featured: true,
    link: "/collection/summer-essentials"
  },
  {
    id: 2,
    name: "Minimalist Living",
    description: "Simple, functional pieces that embody the less-is-more philosophy for clean, modern spaces.",
    image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=500",
    itemCount: 18,
    featured: true,
    link: "/collection/minimalist-living"
  },
  {
    id: 3,
    name: "Cozy Kitchen",
    description: "Transform your kitchen into a warm gathering space with our collection of cooking essentials and decor.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=500",
    itemCount: 32,
    featured: false,
    link: "/collection/cozy-kitchen"
  },
  {
    id: 4,
    name: "Work From Home",
    description: "Create a productive and comfortable workspace with our ergonomic office furniture and accessories.",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=500",
    itemCount: 15,
    featured: true,
    link: "/collection/work-from-home"
  },
  {
    id: 5,
    name: "Sustainable Living",
    description: "Eco-friendly products made from sustainable materials to help reduce your environmental footprint.",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=500",
    itemCount: 21,
    featured: false,
    link: "/collection/sustainable-living"
  },
  {
    id: 6,
    name: "Outdoor Oasis",
    description: "Transform your outdoor spaces into relaxing retreats with our weather-resistant furniture and decor.",
    image: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=500",
    itemCount: 27,
    featured: true,
    link: "/collection/outdoor-oasis"
  }
];

const Collections = () => {
  const [filter, setFilter] = useState('all');
  
  const filteredCollections = filter === 'featured' 
    ? collections.filter(collection => collection.featured)
    : collections;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Page Header */}
        <div className="bg-mint-50 py-12 mt-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Our Collections</h1>
            <p className="text-muted-foreground">Explore our curated collections crafted for every style and space</p>
          </div>
        </div>
        
        {/* Filter tabs */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-secondary rounded-full p-1">
              <Button 
                variant={filter === 'all' ? 'default' : 'ghost'} 
                onClick={() => setFilter('all')}
                className={`rounded-full ${filter === 'all' ? 'bg-mint-500 hover:bg-mint-600' : ''}`}
              >
                All Collections
              </Button>
              <Button 
                variant={filter === 'featured' ? 'default' : 'ghost'} 
                onClick={() => setFilter('featured')}
                className={`rounded-full ${filter === 'featured' ? 'bg-mint-500 hover:bg-mint-600' : ''}`}
              >
                Featured Collections
              </Button>
            </div>
          </div>
          
          {/* Collections grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCollections.map((collection) => (
              <Link 
                key={collection.id} 
                to={collection.link} 
                className="group"
              >
                <div className="overflow-hidden rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-md">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
                    <img 
                      src={collection.image} 
                      alt={collection.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {collection.featured && (
                      <div className="absolute top-4 right-4 bg-mint-500 text-white text-xs py-1 px-2 rounded-full z-20">
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold group-hover:text-mint-500 transition-colors">{collection.name}</h3>
                      <span className="text-sm text-muted-foreground">{collection.itemCount} items</span>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">
                      {collection.description}
                    </p>
                    
                    <div className="flex items-center text-mint-500 font-medium">
                      Explore Collection 
                      <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Collections;
