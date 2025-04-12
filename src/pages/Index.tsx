
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedCategories from '@/components/FeaturedCategories';
import FeaturedProducts from '@/components/FeaturedProducts';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const Index = () => {
  const [cartItems, setCartItems] = useState<string[]>([]);
  
  return (
    <div className="min-h-screen">
      <Navbar cartItems={cartItems} />
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
