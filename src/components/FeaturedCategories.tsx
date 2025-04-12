
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: "Home Decor",
    image: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    count: 124,
    link: "/category/home-decor"
  },
  {
    id: 2,
    name: "Furniture",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    count: 98,
    link: "/category/furniture"
  },
  {
    id: 3,
    name: "Kitchen",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
    count: 76,
    link: "/category/kitchen"
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <div className="flex mb-2">
              <div className="w-12 h-1 bg-mint-500 rounded"></div>
            </div>
            <h2 className="text-3xl font-bold">Shop by Category</h2>
          </div>
          <Link to="/categories" className="mt-4 md:mt-0 flex items-center text-mint-500 hover:text-mint-600 font-medium transition-colors">
            View all categories <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={category.link}
              className="group relative h-80 overflow-hidden rounded-xl"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10"></div>
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                <p className="text-white/80 mt-1">{category.count} products</p>
                <div className="mt-4 inline-flex items-center text-white font-medium">
                  Shop now <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
