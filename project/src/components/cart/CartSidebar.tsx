import React from 'react';
import { X, Trash, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartSidebar: React.FC = () => {
  const { state, dispatch } = useCart();
  
  if (!state.isOpen) return null;

  const handleCloseCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const handleRemoveItem = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, quantity },
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={handleCloseCart}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-900">Your Cart</h2>
            <button 
              onClick={handleCloseCart}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Cart items */}
          <div className="flex-grow overflow-y-auto p-4">
            {state.items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button
                  onClick={handleCloseCart}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <ul className="space-y-4">
                {state.items.map((item) => (
                  <li key={item.id} className="flex border-b border-gray-200 pb-4">
                    <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="text-sm font-medium text-slate-900">{item.name}</h3>
                      <p className="text-amber-500 font-medium">${item.price.toFixed(2)}</p>
                      
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-2 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-1 text-red-500 hover:text-red-700"
                          aria-label="Remove item"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Footer */}
          {state.items.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-slate-900 font-semibold">${state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Shipping</span>
                <span className="text-slate-900 font-semibold">Free</span>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-gray-900 font-bold">Total</span>
                <span className="text-amber-500 font-bold text-xl">${state.total.toFixed(2)}</span>
              </div>
              
              <Link
                to="/checkout"
                onClick={handleCloseCart}
                className="block w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-4 rounded text-center transition-colors"
              >
                Proceed to Checkout
              </Link>
              
              <button
                onClick={handleCloseCart}
                className="block w-full text-slate-700 font-medium py-3 px-4 rounded text-center mt-2 hover:bg-gray-100 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;