
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ArrowRight } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You have been subscribed to our newsletter.",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-mint-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-1 bg-mint-500 rounded"></div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter for exclusive offers, new product announcements, and styling tips.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow border-mint-200 focus-visible:ring-mint-500"
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-mint-500 hover:bg-mint-600 btn-hover"
            >
              {isSubmitting ? (
                "Subscribing..."
              ) : (
                <>
                  Subscribe <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </Button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">
            By subscribing you agree to our Privacy Policy. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
