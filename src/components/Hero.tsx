
import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-mint-50 to-white pt-24 pb-12 md:pt-32 md:pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Discover Your <span className="text-mint-500">Style</span> With Our Collection
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-md">
              Find the perfect products that match your lifestyle. High quality, sustainable, and designed for comfort.
            </p>
            <div className="flex space-x-4 pt-4">
              <Button size="lg" className="bg-mint-500 hover:bg-mint-600 text-white btn-hover">
                <Link to="/shop" className="flex items-center">
                  Shop Now <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-mint-500 text-mint-500 hover:bg-mint-50 btn-hover">
                <Link to="/collections">View Collections</Link>
              </Button>
            </div>
            <div className="flex items-center space-x-6 pt-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-300"></div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-mint-500">2,000+</span> happy customers
              </p>
            </div>
          </div>

          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-mint-300 rounded-full blur-3xl opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700"
                alt="Featured Product" 
                className="hero-image relative z-10 rounded-2xl shadow-xl object-cover object-center w-full max-w-md"
              />
              <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 z-20 transform transition-transform hover:scale-105">
                <div className="text-sm font-semibold">Bestseller</div>
                <div className="text-mint-500 font-bold">$199.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-40 left-10 w-12 h-12 bg-mint-200 rounded-full animate-float delay-300"></div>
      <div className="absolute top-80 right-20 w-8 h-8 bg-mint-300 rounded-full animate-float delay-500"></div>
      <div className="absolute bottom-20 left-1/4 w-10 h-10 bg-mint-100 rounded-full animate-float"></div>
    </div>
  );
};

export default Hero;
