import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, TruckIcon, ArrowLeft, Heart } from 'lucide-react';
import { fetchProductById } from '../services/api';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description');
  const { dispatch } = useCart();
  
  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const productId = parseInt(id, 10);
        const fetchedProduct = await fetchProductById(productId);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProduct();
  }, [id]);
  
  const handleAddToCart = () => {
    if (!product) return;
    
    // Add to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  if (isLoading) {
    return (
      <div className="pt-24 pb-12 container mx-auto px-4">
        <div className="animate-pulse">
          <div className="bg-gray-200 h-8 w-48 mb-4 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 aspect-square rounded"></div>
            <div className="space-y-4">
              <div className="bg-gray-200 h-8 w-3/4 rounded"></div>
              <div className="bg-gray-200 h-6 w-1/4 rounded"></div>
              <div className="bg-gray-200 h-32 rounded"></div>
              <div className="bg-gray-200 h-10 w-full rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="pt-24 pb-12 container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you are looking for does not exist or has been removed.</p>
        <Link 
          to="/products" 
          className="inline-flex items-center text-amber-500 hover:text-amber-600 font-medium"
        >
          <ArrowLeft size={16} className="mr-1" /> Back to Products
        </Link>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-12 container mx-auto px-4">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center text-sm">
          <li>
            <Link to="/" className="text-gray-500 hover:text-amber-500">Home</Link>
          </li>
          <li className="mx-2 text-gray-400">/</li>
          <li>
            <Link to="/products" className="text-gray-500 hover:text-amber-500">Products</Link>
          </li>
          <li className="mx-2 text-gray-400">/</li>
          <li className="text-amber-500 font-medium truncate">{product.name}</li>
        </ol>
      </nav>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden bg-white">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-cover"
          />
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star 
                  key={index} 
                  size={18} 
                  className={`${
                    index < Math.floor(product.rating) 
                      ? 'text-amber-500 fill-amber-500' 
                      : 'text-gray-300'
                  }`} 
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">{product.rating} ({product.reviews} reviews)</span>
          </div>
          
          {/* Price */}
          <div className="text-2xl font-bold text-amber-500 mb-6">${product.price.toFixed(2)}</div>
          
          {/* Category */}
          <div className="mb-6">
            <span className="text-gray-600">Category: </span>
            <Link 
              to={`/products?category=${product.category}`} 
              className="text-slate-900 capitalize hover:text-amber-500"
            >
              {product.category}
            </Link>
          </div>
          
          {/* Add to Cart */}
          <div className="flex items-center mb-6">
            <div className="flex items-center border border-gray-300 rounded mr-4">
              <button 
                onClick={decrementQuantity}
                className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-12 text-center py-2 border-x border-gray-300"
                min="1"
              />
              <button 
                onClick={incrementQuantity}
                className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="flex items-center bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 px-4 rounded transition-colors flex-grow"
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </button>
            
            <button 
              className="ml-3 p-2 border border-gray-300 rounded hover:border-amber-500 hover:text-amber-500 transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart size={18} />
            </button>
          </div>
          
          {/* Shipping Info */}
          <div className="flex items-center text-gray-600 mb-8">
            <TruckIcon size={18} className="mr-2" />
            <span>Free shipping on orders over $50</span>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 ${
                  activeTab === 'description'
                    ? 'border-amber-500 text-amber-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`py-4 px-1 mr-8 font-medium text-sm border-b-2 ${
                  activeTab === 'details'
                    ? 'border-amber-500 text-amber-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 font-medium text-sm border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-amber-500 text-amber-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reviews
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="py-4">
            {activeTab === 'description' && (
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            )}
            
            {activeTab === 'details' && (
              <div className="text-gray-600">
                <p className="mb-4">
                  This premium {product.name} is designed with quality and durability in mind.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>High-quality materials</li>
                  <li>Designed for everyday use</li>
                  <li>Backed by our satisfaction guarantee</li>
                  <li>30-day return policy</li>
                </ul>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <p className="text-gray-600">
                  This product has {product.reviews} reviews with an average rating of {product.rating} stars.
                </p>
                <div className="bg-gray-50 p-4 rounded">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <Star 
                          key={index} 
                          size={16} 
                          className={`${
                            index < 5 ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-medium">Excellent Product!</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    "I absolutely love this product. The quality exceeds my expectations and it arrived quickly."
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    John D. - Verified Buyer
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <Star 
                          key={index} 
                          size={16} 
                          className={`${
                            index < 4 ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-medium">Great Value</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    "This is exactly what I was looking for. The price is fair for the quality you receive."
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    Sarah M. - Verified Buyer
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;