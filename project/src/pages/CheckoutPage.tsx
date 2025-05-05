import React from 'react';
import { Link } from 'react-router-dom';
import CheckoutForm from '../components/checkout/CheckoutForm';
import { useCart } from '../context/CartContext';

const CheckoutPage: React.FC = () => {
  const { state } = useCart();

  // Redirect if cart is empty
  if (state.items.length === 0) {
    return (
      <div className="pt-24 pb-12 container mx-auto px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Add some products to your cart before proceeding to checkout.</p>
        <Link 
          to="/products" 
          className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 px-6 rounded transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <CheckoutForm />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Order Summary</h2>
            
            <div className="space-y-4 max-h-80 overflow-y-auto mb-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-start">
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3 flex-grow">
                    <h3 className="text-sm font-medium text-slate-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    <p className="text-sm font-medium text-amber-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-slate-900 font-medium">${state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-slate-900 font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-slate-900 font-medium">$0.00</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 text-lg font-bold">
                <span>Total</span>
                <span className="text-amber-500">${state.total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <Link 
                to="/products" 
                className="block text-center text-amber-500 hover:text-amber-600 font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;