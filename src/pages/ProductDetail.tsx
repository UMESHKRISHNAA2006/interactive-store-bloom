
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Minus, Plus, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/context/CartContext';
import WishlistButton from '@/components/WishlistButton';

// Import products data - in a real app this would come from an API
import { products } from '@/data/products';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Find the product from our data
  const product = products.find(p => p.id === productId);
  
  // If product not found, show error and redirect
  useEffect(() => {
    if (!product) {
      toast({
        title: "Product not found",
        description: "The product you're looking for doesn't exist.",
        variant: "destructive"
      });
      navigate('/shop');
    }
  }, [product, navigate, toast]);
  
  if (!product) return null;
  
  // Additional images for the product gallery
  const productImages = [
    product.image, // Main image
    // Additional images - in a real app these would come from the product data
    `https://images.unsplash.com/photo-${product.image.split('photo-')[1].split('?')[0]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700&q=80`,
    `https://images.unsplash.com/photo-${product.image.split('photo-')[1].split('?')[0]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700&q=60`
  ];
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
    
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <div className="text-sm text-muted-foreground">
            <button onClick={() => navigate('/')} className="hover:text-mint-500">Home</button>
            <span className="mx-2">/</span>
            <button onClick={() => navigate('/shop')} className="hover:text-mint-500">Shop</button>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
        
        {/* Product Detail */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Images */}
            <div className="md:w-1/2">
              <div className="flex flex-col-reverse md:flex-row gap-4">
                {/* Thumbnail Gallery */}
                <div className="flex md:flex-col gap-2 md:w-1/5">
                  {productImages.map((image, index) => (
                    <div 
                      key={index}
                      className={`border-2 rounded-md overflow-hidden cursor-pointer transition-all ${
                        selectedImage === index ? 'border-mint-500' : 'border-transparent hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} - Image ${index + 1}`}
                        className="w-16 h-16 object-cover"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Main Image */}
                <div className="md:w-4/5 bg-gray-50 rounded-lg overflow-hidden">
                  <img 
                    src={productImages[selectedImage]} 
                    alt={product.name}
                    className="w-full h-auto object-cover aspect-square md:aspect-auto md:h-[500px]"
                  />
                </div>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="md:w-1/2">
              {/* Product badges */}
              <div className="flex gap-2 mb-4">
                {product.isNew && (
                  <span className="bg-mint-500 text-white text-xs py-1 px-2 rounded-full">
                    New
                  </span>
                )}
                {product.isSale && (
                  <span className="bg-red-500 text-white text-xs py-1 px-2 rounded-full">
                    -{discount}% Sale
                  </span>
                )}
              </div>
              
              {/* Product name and category */}
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground mb-4">{product.category}</p>
              
              {/* Price */}
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="ml-3 text-lg line-through text-gray-400">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Description */}
              <div className="mb-8">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">
                  {product.description || `Experience the elegance and functionality of our ${product.name}. Designed with premium materials and attention to detail, this ${product.category.toLowerCase()} piece offers both style and practicality for your home or office.`}
                </p>
              </div>
              
              {/* Quantity selector */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Quantity</h3>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
              
              {/* Add to cart and wishlist */}
              <div className="flex items-center gap-3 mb-6">
                <Button 
                  className="flex-grow bg-mint-500 hover:bg-mint-600 text-white"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <WishlistButton 
                  productId={product.id} 
                  productName={product.name}
                />
                <Button variant="outline" size="icon">
                  <Share2 size={18} />
                </Button>
              </div>
              
              {/* Additional info */}
              <div className="border-t pt-6">
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SKU</span>
                    <span>SKU-{product.id.padStart(4, '0')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span>{product.category}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
