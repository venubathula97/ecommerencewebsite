import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/product/ProductList';
import { fetchProducts, fetchCategories, fetchProductsByCategory } from '../services/api';
import { Product, Category } from '../types';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  
  // Get category from URL if present
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);
  
  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    
    loadCategories();
  }, []);
  
  // Load products based on selected category
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const fetchedProducts = await fetchProductsByCategory(selectedCategory);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, [selectedCategory]);
  
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Update URL when category changes
    setSearchParams(categoryId === 'all' ? {} : { category: categoryId });
  };

  return (
    <div className="pt-24 pb-12 container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Our Products</h1>
        <p className="text-gray-600">
          Discover our collection of premium quality products for your modern lifestyle.
        </p>
      </div>
      
      <ProductList
        products={products}
        categories={categories}
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProductsPage;