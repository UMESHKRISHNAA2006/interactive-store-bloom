
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

const categories = ["All", "Home Decor", "Furniture", "Electronics", "Kitchenware", "Plants"];

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart();
  
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(product => product.category === activeCategory);
    
  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
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
                  onAddToCart={() => handleAddToCart(product)}
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
