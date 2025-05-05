import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { processPayment, validatePaymentMethod } from '../../services/stripe';

const CheckoutForm: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  };

  const formatExpiry = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2');
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 19); // limit to 16 digits + 3 spaces
    setFormData({
      ...formData,
      cardNumber: formatCardNumber(value),
    });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 5); // MM/YY format (5 chars)
    setFormData({
      ...formData,
      cardExpiry: formatExpiry(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);
    
    // Basic validation
    for (const key in formData) {
      if (formData[key as keyof typeof formData] === '') {
        setPaymentError('Please fill out all fields');
        return;
      }
    }
    
    // Validate payment method
    const validation = validatePaymentMethod(
      formData.cardNumber.replace(/\s/g, ''),
      formData.cardExpiry,
      formData.cardCvc
    );
    
    if (!validation.valid) {
      setPaymentError(validation.error || 'Invalid payment information');
      return;
    }
    
    // Process payment
    setIsProcessing(true);
    try {
      await processPayment('mock_payment_method_id', state.total);
      
      // Success - clear cart and redirect
      dispatch({ type: 'CLEAR_CART' });
      navigate('/checkout/success');
    } catch (error) {
      setPaymentError('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Shipping Information */}
      <div>
        <h3 className="text-lg font-medium text-slate-900 mb-4">Shipping Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State / Province
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
              ZIP / Postal Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Japan">Japan</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div>
        <h3 className="text-lg font-medium text-slate-900 mb-4">Payment Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          <div>
            <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
              Expiration Date
            </label>
            <input
              type="text"
              id="cardExpiry"
              name="cardExpiry"
              value={formData.cardExpiry}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          <div>
            <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">
              CVC
            </label>
            <input
              type="text"
              id="cardCvc"
              name="cardCvc"
              value={formData.cardCvc}
              onChange={handleInputChange}
              placeholder="123"
              maxLength={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-lg font-medium text-slate-900 mb-4">Order Summary</h3>
        <div className="space-y-2">
          {state.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span className="text-gray-600">
                {item.name} × {item.quantity}
              </span>
              <span className="text-slate-900 font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="border-t border-gray-200 my-2 pt-2"></div>
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-slate-900 font-medium">${state.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="text-slate-900 font-medium">Free</span>
          </div>
          <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t border-gray-200">
            <span>Total</span>
            <span className="text-amber-500">${state.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Error message */}
      {paymentError && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md">
          {paymentError}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isProcessing}
        className={`w-full py-3 px-4 text-white font-medium rounded-md transition-colors ${
          isProcessing
            ? 'bg-slate-400 cursor-not-allowed'
            : 'bg-slate-900 hover:bg-slate-800'
        }`}
      >
        {isProcessing ? 'Processing...' : `Pay $${state.total.toFixed(2)}`}
      </button>
    </form>
  );
};

export default CheckoutForm;