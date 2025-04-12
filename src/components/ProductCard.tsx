
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  onAddToCart?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  id, 
  name, 
  price, 
  originalPrice, 
  image, 
  category, 
  isNew = false, 
  isSale = false,
  onAddToCart
}) => {
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleAddToCart = () => {
    onAddToCart?.(id);
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
      duration: 3000,
    });
  };
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from wishlist" : "Added to wishlist",
      description: `${name} has been ${isFavorite ? "removed from" : "added to"} your wishlist.`,
      duration: 3000,
    });
  };

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div 
      className="group product-card relative rounded-xl overflow-hidden bg-white shadow-sm card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${id}`} className="block">
        <div className="relative overflow-hidden h-64 bg-gray-100">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {isNew && (
            <span className="absolute top-3 left-3 bg-mint-500 text-white text-xs py-1 px-2 rounded-full">
              New
            </span>
          )}
          
          {isSale && originalPrice && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs py-1 px-2 rounded-full">
              -{discount}%
            </span>
          )}
          
          <div 
            className={cn(
              "absolute right-3 flex flex-col gap-2 transition-all duration-300",
              isHovered ? "opacity-100 top-3" : "opacity-0 top-6"
            )}
          >
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full shadow-sm bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={toggleFavorite}
            >
              <Heart 
                size={18} 
                className={cn("transition-colors", isFavorite ? "fill-red-500 text-red-500" : "text-gray-600")} 
              />
            </Button>
            
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full shadow-sm bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              <Link to={`/product/${id}`}>
                <Eye size={18} className="text-gray-600" />
              </Link>
            </Button>
          </div>
          
          <div 
            className={cn(
              "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 transition-all duration-300",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <Button 
              className="w-full bg-white text-mint-700 hover:bg-mint-50 border border-mint-200"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} className="mr-2" /> Add to Cart
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="text-sm text-muted-foreground">{category}</div>
          <h3 className="font-semibold text-lg mt-1 group-hover:text-mint-500 transition-colors">{name}</h3>
          <div className="mt-2 flex items-center">
            <span className="font-bold text-foreground">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="ml-2 text-sm line-through text-gray-400">${originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
