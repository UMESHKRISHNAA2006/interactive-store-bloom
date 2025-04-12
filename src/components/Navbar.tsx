
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import SearchModal from './SearchModal';
import UserMenu from './UserMenu';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { cartState } = useCart();
  const { items, totalItems } = cartState;
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (totalItems > 0) {
      setIsCartAnimating(true);
      const timer = setTimeout(() => setIsCartAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-mint-500">
            Bloom
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-foreground hover:text-mint-500 transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-foreground hover:text-mint-500 transition-colors">
              Shop
            </Link>
            <Link to="/collections" className="text-foreground hover:text-mint-500 transition-colors">
              Collections
            </Link>
            <Link to="/about" className="text-foreground hover:text-mint-500 transition-colors">
              About
            </Link>
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search size={20} className="text-foreground hover:text-mint-500" />
            </Button>
            
            <UserMenu />
            
            <Button variant="ghost" size="icon">
              <Link to="/wishlist">
                <Heart size={20} className="text-foreground hover:text-mint-500" />
              </Link>
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <Link to="/cart">
                <ShoppingCart size={20} className="text-foreground hover:text-mint-500" />
                {totalItems > 0 && (
                  <span
                    className={`absolute -top-1 -right-1 bg-mint-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center cart-bubble ${
                      isCartAnimating ? 'animate' : ''
                    }`}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search size={20} className="text-foreground" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <Link to="/cart">
                <ShoppingCart size={20} className="text-foreground" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-mint-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </Button>
            
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? (
                <X size={24} className="text-foreground" />
              ) : (
                <Menu size={24} className="text-foreground" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white py-4 animate-fade-in">
            <div className="flex flex-col space-y-4 px-4">
              <Link to="/" className="text-foreground hover:text-mint-500 transition-colors py-2">
                Home
              </Link>
              <Link to="/shop" className="text-foreground hover:text-mint-500 transition-colors py-2">
                Shop
              </Link>
              <Link to="/collections" className="text-foreground hover:text-mint-500 transition-colors py-2">
                Collections
              </Link>
              <Link to="/about" className="text-foreground hover:text-mint-500 transition-colors py-2">
                About
              </Link>
              <div className="flex items-center space-x-4 pt-2">
                <UserMenu />
                
                <Button variant="ghost" size="icon">
                  <Link to="/wishlist">
                    <Heart size={20} className="text-foreground" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
};

export default Navbar;
