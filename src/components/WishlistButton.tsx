
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface WishlistButtonProps {
  productId: string;
  productName: string;
  variant?: "ghost" | "outline" | "default" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ 
  productId, 
  productName,
  variant = "secondary",
  size = "icon",
  className
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  // In a real app, we would check if the item is in the user's wishlist
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(productId));
  }, [productId]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter((id: string) => id !== productId);
      toast({
        title: "Removed from wishlist",
        description: `${productName} has been removed from your wishlist.`,
        duration: 3000,
      });
    } else {
      newFavorites = [...favorites, productId];
      toast({
        title: "Added to wishlist",
        description: `${productName} has been added to your wishlist.`,
        duration: 3000,
      });
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      className={cn(
        "rounded-full", 
        className
      )}
      onClick={toggleFavorite}
      aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart 
        size={18} 
        className={cn(
          "transition-colors", 
          isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
        )} 
      />
    </Button>
  );
};

export default WishlistButton;
