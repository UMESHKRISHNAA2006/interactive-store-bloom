
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { cartState, removeFromCart, updateQuantity, clearCart } = useCart();
  const { toast } = useToast();
  const { items, totalItems, totalPrice } = cartState;

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemove = (id: string, name: string) => {
    removeFromCart(id);
    toast({
      title: "Item removed",
      description: `${name} has been removed from your cart.`,
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout initiated",
      description: "This would normally redirect to a checkout page.",
    });
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const couponInput = form.elements.namedItem('coupon') as HTMLInputElement;
    
    if (couponInput.value) {
      toast({
        title: "Coupon applied",
        description: "Your discount has been applied to the order.",
      });
      couponInput.value = '';
    } else {
      toast({
        title: "No coupon entered",
        description: "Please enter a valid coupon code.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-16 mt-16">
          <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
          
          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items - Left Column */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-center pb-4 border-b">
                      <h2 className="font-bold">{totalItems} {totalItems === 1 ? 'Item' : 'Items'} in Cart</h2>
                      <Button 
                        variant="ghost" 
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={clearCart}
                      >
                        Clear Cart
                      </Button>
                    </div>
                    
                    <div className="divide-y">
                      {items.map(item => (
                        <div key={item.id} className="py-6 flex flex-col sm:flex-row">
                          {/* Product Image */}
                          <div className="sm:w-1/4 mb-4 sm:mb-0">
                            <Link to={`/product/${item.id}`}>
                              <div className="aspect-square rounded-md overflow-hidden bg-secondary">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </Link>
                          </div>
                          
                          {/* Product Details */}
                          <div className="sm:w-3/4 sm:pl-6 flex flex-col justify-between">
                            <div>
                              <Link to={`/product/${item.id}`}>
                                <h3 className="font-semibold mb-2 hover:text-mint-500 transition-colors">
                                  {item.name}
                                </h3>
                              </Link>
                              <p className="text-muted-foreground mb-4 text-sm">
                                Product ID: {item.id}
                              </p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="inline-flex items-center border rounded-md">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-9 w-9 rounded-none"
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus size={16} />
                                </Button>
                                <span className="w-10 text-center">{item.quantity}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-9 w-9 rounded-none"
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus size={16} />
                                </Button>
                              </div>
                              
                              <div className="flex justify-between sm:justify-end items-center w-full sm:w-auto gap-4">
                                <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                  onClick={() => handleRemove(item.id, item.name)}
                                >
                                  <Trash2 size={18} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" className="flex-1">
                    <Link to="/shop" className="flex items-center justify-center w-full">
                      <ShoppingBag size={16} className="mr-2" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Order Summary - Right Column */}
              <div>
                <div className="bg-white rounded-lg shadow-sm border border-border p-6 sticky top-24">
                  <h2 className="font-bold text-lg mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Tax</span>
                      <span>Calculated at checkout</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-b py-3 mb-4">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mb-4 bg-mint-500 hover:bg-mint-600"
                    onClick={handleCheckout}
                  >
                    Checkout <ArrowRight size={16} className="ml-2" />
                  </Button>
                  
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <Input
                      name="coupon"
                      placeholder="Promo code"
                      className="flex-grow"
                    />
                    <Button type="submit" variant="outline">Apply</Button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            // Empty cart state
            <div className="text-center py-16">
              <div className="flex justify-center mb-4">
                <ShoppingBag size={64} className="text-mint-200" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button className="bg-mint-500 hover:bg-mint-600">
                <Link to="/shop" className="flex items-center">
                  Start Shopping <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
