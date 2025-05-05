import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { fetchProducts } from '../services/api';
import { Product } from '../types';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await fetchProducts();
        // Filter for featured products or just take the first 4 if none are marked as featured
        const featured = products.filter(p => p.featured).length > 0 
          ? products.filter(p => p.featured) 
          : products.slice(0, 4);
        setFeaturedProducts(featured);
      } catch (error) {
        console.error('Error loading featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/5872357/pexels-photo-5872357.jpeg?auto=compress&cs=tinysrgb&w=1600" 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Discover Premium Quality Products
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Explore our curated collection of high-quality products designed for your modern lifestyle.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/products" 
                className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                Shop Now
              </Link>
              <Link 
                to="/categories" 
                className="bg-transparent border border-white text-white font-medium py-3 px-6 rounded-md hover:bg-white hover:text-slate-900 transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Featured Products</h2>
          <Link 
            to="/products" 
            className="text-amber-500 hover:text-amber-600 font-medium flex items-center transition-colors"
          >
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm p-4 h-72">
                <div className="w-full h-48 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded mt-4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded mt-2 w-1/2 animate-pulse"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Categories Banner */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative rounded-lg overflow-hidden group h-48 md:h-64">
              <img 
                src="https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Electronics" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Link 
                  to="/products?category=electronics" 
                  className="text-white font-bold text-xl md:text-2xl hover:text-amber-300 transition-colors"
                >
                  Electronics
                </Link>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden group h-48 md:h-64">
              <img 
                src="https://images.pexels.com/photos/6480219/pexels-photo-6480219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Furniture" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Link 
                  to="/products?category=furniture" 
                  className="text-white font-bold text-xl md:text-2xl hover:text-amber-300 transition-colors"
                >
                  Furniture
                </Link>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden group h-48 md:h-64">
              <img 
                src="https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Clothing" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Link 
                  to="/products?category=clothing" 
                  className="text-white font-bold text-xl md:text-2xl hover:text-amber-300 transition-colors"
                >
                  Clothing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Simple version */}
      <section className="py-12 md:py-16 container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center text-amber-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 mb-4">
              "The quality of the products exceeds my expectations. Fast shipping and great customer service. Will definitely order again!"
            </p>
            <div className="font-medium">Sarah M.</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center text-amber-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 mb-4">
              "I love the premium wireless headphones. The sound quality is amazing and the battery lasts forever. Worth every penny!"
            </p>
            <div className="font-medium">Michael T.</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center text-amber-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 mb-4">
              "The checkout process was smooth and my order arrived in perfect condition. The attention to detail in packaging was impressive."
            </p>
            <div className="font-medium">Jessica K.</div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-amber-500 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Enhance Your Lifestyle?</h2>
          <p className="text-lg text-amber-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and explore our premium collection of products today.
          </p>
          <Link 
            to="/products" 
            className="inline-block bg-white text-amber-500 font-medium py-3 px-8 rounded-md hover:bg-slate-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;