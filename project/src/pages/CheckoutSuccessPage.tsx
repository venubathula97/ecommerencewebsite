import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const CheckoutSuccessPage: React.FC = () => {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-12 container mx-auto px-4 max-w-3xl mx-auto text-center">
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <div className="flex justify-center mb-4">
          <CheckCircle size={64} className="text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Order Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-md mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Order Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-sm text-gray-500">Order Number</p>
              <p className="font-medium">{orderNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-medium">Credit Card</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Shipping Method</p>
              <p className="font-medium">Standard Shipping</p>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-8">
          You will receive an order confirmation email with details of your order.
          If you have any questions, please contact our customer support.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/"
            className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 px-6 rounded transition-colors"
          >
            Back to Home
          </Link>
          <Link 
            to="/products" 
            className="bg-white border border-slate-300 hover:border-slate-400 text-slate-900 font-medium py-2 px-6 rounded transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;