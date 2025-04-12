
import React, { useEffect, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const testimonials = [
  {
    id: 1,
    name: "Alex Morgan",
    title: "Interior Designer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    content: "The quality of the products exceeded my expectations. The attention to detail and craftsmanship is remarkable. I've recommended Bloom to all my clients.",
    rating: 5
  },
  {
    id: 2,
    name: "James Wilson",
    title: "Architect",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    content: "Bloom has transformed my home office with their minimalist yet functional designs. The customer service is also top-notch. Very satisfied with my purchase!",
    rating: 5
  },
  {
    id: 3,
    name: "Sophia Chen",
    title: "Product Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    content: "From browsing to delivery, the entire experience was seamless. The products are beautiful, sustainable, and exactly as described. Bloom is now my go-to for home goods.",
    rating: 4
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const goToNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const goToPrev = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [activeIndex]);
  
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-mint-100 rounded-full blur-3xl opacity-20 -z-10"></div>
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers think about our products and services.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <Quote className="absolute text-mint-100 w-20 h-20 -top-6 -left-6 z-0" />
          
          <div className="relative z-10">
            <div className="overflow-hidden relative">
              <div 
                className={`flex transition-transform duration-500 ease-out ${isAnimating ? 'opacity-80' : ''}`}
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-xl p-8 sm:p-10 text-center">
                      <div className="flex justify-center mb-6">
                        <div className="relative">
                          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-mint-500 text-white rounded-full p-1 shadow-md">
                            <Star size={12} fill="white" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={18} 
                            className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                          />
                        ))}
                      </div>
                      
                      <p className="text-lg font-medium mb-4 italic">
                        "{testimonial.content}"
                      </p>
                      
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === index ? "bg-mint-500 w-6" : "bg-mint-200"
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
          
          <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 hidden md:block">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-mint-200 hover:bg-mint-50"
              onClick={goToPrev}
            >
              <ChevronLeft className="text-mint-500" />
            </Button>
          </div>
          
          <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 hidden md:block">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-mint-200 hover:bg-mint-50"
              onClick={goToNext}
            >
              <ChevronRight className="text-mint-500" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
