
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

// Dummy products data
const products = [
  {
    id: "1",
    name: "Minimalist Table Lamp",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    category: "Home Decor",
    isNew: true
  },
  {
    id: "2",
    name: "Ergonomic Office Chair",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    category: "Furniture",
    isSale: true
  },
  {
    id: "3",
    name: "Wireless Bluetooth Speaker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    category: "Electronics",
    isNew: true
  },
  {
    id: "4",
    name: "Ceramic Coffee Mug",
    price: 24.99,
    originalPrice: 29.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    category: "Kitchenware",
    isSale: true
  },
  {
    id: "5",
    name: "Cotton Throw Pillow",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1584208124792-85dcb8d6a8bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    category: "Home Decor"
  },
  {
    id: "6",
    name: "Houseplant Collection",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1463320898484-cdee8141c787?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    category: "Plants"
  },
  {
    id: "7",
    name: "Stainless Steel Water Bottle",
    price: 29.99,
    originalPrice: 35.99,
    image: "https://images.unsplash.com/photo-1570367448211-f2d14d4a63b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    category: "Kitchen",
    isSale: true
  },
  {
    id: "8",
    name: "Scented Soy Candle",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1602523069441-c170e5280fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    category: "Home Decor"
  }
];

const categories = ["All", "Home Decor", "Furniture", "Electronics", "Kitchenware", "Plants"];

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartItems, setCartItems] = useState<string[]>([]);
  
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(product => product.category === activeCategory);
    
  const handleAddToCart = (id: string) => {
    setCartItems(prev => [...prev, id]);
  };

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of trending products, handpicked for quality and style.
          </p>
          
          <div className="flex flex-wrap justify-center mt-8 gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={`rounded-full transition-all ${
                  activeCategory === category ? "bg-mint-500 hover:bg-mint-600" : "hover:text-mint-500"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: parseInt(product.id) * 0.1 }}
              >
                <ProductCard
                  {...product}
                  onAddToCart={handleAddToCart}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
