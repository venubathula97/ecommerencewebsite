import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Product, Category } from '../../types';
import { ChevronDown, Filter } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  categories: Category[];
  onCategorySelect: (categoryId: string) => void;
  selectedCategory: string;
  isLoading: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  categories,
  onCategorySelect,
  selectedCategory,
  isLoading,
}) => {
  const [sortOption, setSortOption] = useState('default');
  const [showFilter, setShowFilter] = useState(false);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Apply sorting
    const sorted = [...products]; // Create a copy to avoid mutating props
    
    switch (sortOption) {
      case 'price-low-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-a-z':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-z-a':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Keep the original order for "featured" or default sort
        break;
    }
    
    setSortedProducts(sorted);
  }, [products, sortOption]);
  
  // Toggle mobile filter view
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className="mt-4">
      {/* Mobile filter toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={toggleFilter}
          className="flex items-center justify-between w-full p-3 bg-white rounded border border-gray-300"
        >
          <div className="flex items-center">
            <Filter size={16} className="mr-2" />
            <span>Filter & Sort</span>
          </div>
          <ChevronDown size={16} className={`transform transition-transform ${showFilter ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      <div className={`md:flex justify-between items-center mb-6 ${showFilter ? 'block' : 'hidden md:flex'}`}>
        {/* Categories */}
        <div className="flex flex-wrap mb-4 md:mb-0 gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Sort dropdown */}
        <div>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="block w-full px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="default">Featured</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="rating">Best Rating</option>
            <option value="name-a-z">Name: A to Z</option>
            <option value="name-z-a">Name: Z to A</option>
          </select>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm p-4 h-72">
              <div className="w-full h-48 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded mt-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded mt-2 w-1/2 animate-pulse"></div>
            </div>
          ))}
        </div>
      ) : sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;