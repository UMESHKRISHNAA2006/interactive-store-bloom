
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white pt-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-mint-500">Bloom</Link>
            <p className="text-muted-foreground">
              Curated products for modern living. Quality, sustainability, and thoughtful design.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-mint-500 transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-mint-500 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-mint-500 transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-mint-500 transition-colors">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          
          {/* Shop */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-mint-500 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-muted-foreground hover:text-mint-500 transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/featured" className="text-muted-foreground hover:text-mint-500 transition-colors">
                  Featured
                </Link>
              </li>
              <li>
                <Link to="/sale" className="text-muted-foreground hover:text-mint-500 transition-colors">
                  Sale
                </Link>
              </li>
              <li>
                <Link to="/gift-cards" className="text-muted-foreground hover:text-mint-500 transition-colors">
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Help */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Care</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-mint-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-mint-500 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-muted-foreground hover:text-mint-500 transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-mint-500 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-mint-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-mint-500 flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">
                  1234 Design Street, San Francisco, CA 94107
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-mint-500 flex-shrink-0" />
                <a href="tel:+11234567890" className="text-muted-foreground hover:text-mint-500 transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-mint-500 flex-shrink-0" />
                <a href="mailto:hello@bloom.com" className="text-muted-foreground hover:text-mint-500 transition-colors">
                  hello@bloom.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 py-6 border-t border-border flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Bloom. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <img src="https://cdn.cdnlogo.com/logos/v/69/visa.svg" alt="Visa" className="h-6 w-auto mx-1" />
            <img src="https://cdn.cdnlogo.com/logos/m/33/mastercard.svg" alt="Mastercard" className="h-8 w-auto mx-1" />
            <img src="https://cdn.cdnlogo.com/logos/a/57/american-express.svg" alt="Amex" className="h-6 w-auto mx-1" />
            <img src="https://cdn.cdnlogo.com/logos/p/57/paypal.svg" alt="PayPal" className="h-5 w-auto mx-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
