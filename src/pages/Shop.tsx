import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Check, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

const categories = ["All", "Home Decor", "Furniture", "Electronics", "Kitchenware", "Plants", "Kitchen"];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  
  const { addToCart } = useCart();
  
  // Filter products based on category, search query and price range
  const filteredProducts = products
    .filter(product => activeCategory === "All" || product.category === activeCategory)
    .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    // Default is featured (original order)
    return 0;
  });

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Page Header */}
        <div className="bg-mint-50 py-12 mt-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Shop All Products</h1>
            <p className="text-muted-foreground">Find the perfect items for your home and lifestyle</p>
          </div>
        </div>
        
        {/* Shop Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Filters */}
            <div className="lg:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                <div className="flex justify-between items-center mb-4 lg:hidden">
                  <h3 className="font-semibold">Filters</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <ChevronDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} size={18} />
                  </Button>
                </div>
                
                <div className={`${showFilters ? 'block' : 'hidden lg:block'} space-y-6`}>
                  {/* Categories */}
                  <div>
                    <h3 className="font-semibold mb-3">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <Button
                            variant="ghost"
                            className={`w-full justify-start px-2 ${activeCategory === category ? 'text-mint-500 font-medium' : ''}`}
                            onClick={() => setActiveCategory(category)}
                          >
                            {activeCategory === category && <Check size={16} className="mr-2" />}
                            {category}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div>
                    <h3 className="font-semibold mb-3">Price Range</h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 300]}
                        min={0}
                        max={300}
                        step={10}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mb-6"
                      />
                      <div className="flex items-center justify-between">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Grid */}
            <div className="lg:w-3/4">
              {/* Search and Sort */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow"
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-input rounded-md px-3 py-2 bg-transparent"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
              
              {/* Products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    onAddToCart={() => handleAddToCart(product)}
                  />
                ))}
              </div>
              
              {/* Empty state */}
              {sortedProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No products found. Please try different filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
