import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { searchProducts } from '../services/api';
import { Product } from '../types';

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const performSearch = async () => {
      if (!query) return;
      
      setIsLoading(true);
      try {
        const results = await searchProducts(query);
        setProducts(results);
      } catch (error) {
        console.error('Error searching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    performSearch();
  }, [query]);
  
  return (
    <div className="pt-24 pb-12 container mx-auto px-4">
      <div className="mb-8">
        <Link to="/products" className="inline-flex items-center text-amber-500 hover:text-amber-600 mb-4">
          <ArrowLeft size={16} className="mr-1" /> Back to Products
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Search Results: "{query}"
        </h1>
        <p className="text-gray-600">
          {isLoading
            ? 'Searching products...'
            : products.length === 0
              ? 'No products found matching your search.'
              : `Found ${products.length} product${products.length === 1 ? '' : 's'} matching your search.`}
        </p>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm p-4 h-72">
              <div className="w-full h-48 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded mt-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded mt-2 w-1/2 animate-pulse"></div>
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 mb-6">
            We couldn't find any products matching "{query}".
          </p>
          <p className="mb-6">
            Try adjusting your search or browse our categories below.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link 
              to="/products?category=electronics" 
              className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Electronics
            </Link>
            <Link 
              to="/products?category=clothing" 
              className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Clothing
            </Link>
            <Link 
              to="/products?category=furniture" 
              className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Furniture
            </Link>
            <Link 
              to="/products?category=accessories" 
              className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Accessories
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;