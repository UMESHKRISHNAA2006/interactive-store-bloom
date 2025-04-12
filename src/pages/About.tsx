
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  ShieldCheck, 
  RefreshCcw, 
  Heart,
  Leaf,
  Award,
  Users
} from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <div className="bg-mint-50 py-16 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
                <p className="text-muted-foreground mb-6">
                  Founded in 2020, Bloom started with a simple mission: to bring stylish, sustainable home goods to conscious consumers.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-mint-500 hover:bg-mint-600">
                    <Link to="/shop">Shop Our Products</Link>
                  </Button>
                  <Button variant="outline" className="border-mint-500 text-mint-500 hover:bg-mint-50">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-mint-300 rounded-full blur-3xl opacity-20"></div>
                <img 
                  src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Our Team" 
                  className="relative rounded-lg shadow-lg z-10"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Our Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We believe in creating products that not only look beautiful in your home but are also made with integrity and care for the planet.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-mint-50 rounded-full">
                    <Leaf className="text-mint-500" size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                <p className="text-muted-foreground">
                  We're committed to reducing our environmental footprint by using sustainable materials and ethical production methods.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-mint-50 rounded-full">
                    <Award className="text-mint-500" size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Quality</h3>
                <p className="text-muted-foreground">
                  Each product is carefully designed and tested to ensure lasting quality and functionality for years to come.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-mint-50 rounded-full">
                    <Users className="text-mint-500" size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  We believe in supporting the communities where our products are made through fair wages and ethical working conditions.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex mb-4">
                  <div className="w-12 h-1 bg-mint-500 rounded"></div>
                </div>
                <h2 className="text-3xl font-bold mb-4">From Idea to Reality</h2>
                <div className="space-y-4">
                  <p>
                    Bloom began as a small design studio focused on creating sustainable home goods. Our founder, Jane Smith, was inspired by her travels around the world and the beautiful handcrafted items she discovered.
                  </p>
                  <p>
                    What started as a passion project quickly grew into a thriving business as customers fell in love with our commitment to quality, sustainability, and beautiful design. Today, we work with artisans and manufacturers who share our values.
                  </p>
                  <p>
                    Our team has grown from 2 to 25 members, but our mission remains the same: to create products that bring joy to your home while respecting our planet.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1556742393-d75f468bfcb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500" 
                  alt="Our Workshop" 
                  className="rounded-lg shadow-sm w-full h-full object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1581058897220-c31e8007379d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Design Process" 
                  className="rounded-lg shadow-sm w-full object-cover mb-4"
                />
                <img 
                  src="https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Product Creation" 
                  className="rounded-lg shadow-sm w-full object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1605217613423-c5ca91297c59?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500" 
                  alt="Our Products" 
                  className="rounded-lg shadow-sm w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Shop With Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Shop With Us</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're committed to providing an exceptional shopping experience from start to finish.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start p-4">
                <div className="mr-4">
                  <Truck className="text-mint-500" size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Free Shipping</h3>
                  <p className="text-muted-foreground">Enjoy free shipping on all orders over $50 within the continental US.</p>
                </div>
              </div>
              
              <div className="flex items-start p-4">
                <div className="mr-4">
                  <RefreshCcw className="text-mint-500" size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Easy Returns</h3>
                  <p className="text-muted-foreground">Not satisfied? Return within 30 days for a full refund or exchange.</p>
                </div>
              </div>
              
              <div className="flex items-start p-4">
                <div className="mr-4">
                  <ShieldCheck className="text-mint-500" size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Secure Payments</h3>
                  <p className="text-muted-foreground">Shop with confidence with our encrypted payment processing.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Newsletter />
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
