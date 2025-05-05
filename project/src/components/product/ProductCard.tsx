import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };
  
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Product image with overlay */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-square">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        
        {/* Quick add to cart */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 bg-white text-slate-900 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
          aria-label="Add to cart"
        >
          <ShoppingCart size={20} />
        </button>
        
        {/* Featured tag */}
        {product.featured && (
          <span className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
            Featured
          </span>
        )}
      </Link>
      
      {/* Product info */}
      <div className="p-4">
        <div className="mb-1 flex items-center">
          <div className="flex items-center">
            <Star size={14} className="text-amber-500 fill-amber-500" />
            <span className="ml-1 text-sm text-slate-700">{product.rating}</span>
          </div>
          <span className="mx-1 text-slate-400">•</span>
          <span className="text-sm text-slate-500">{product.reviews} reviews</span>
        </div>
        
        <Link to={`/product/${product.id}`} className="block mt-1">
          <h3 className="text-base font-medium text-slate-900 hover:text-amber-500 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-2 flex items-center justify-between">
          <span className="font-semibold text-slate-900">${product.price.toFixed(2)}</span>
          <span className="text-xs text-slate-500 capitalize">{product.category}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;