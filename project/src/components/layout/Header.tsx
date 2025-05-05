import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-slate-900 flex items-center">
            <span className="text-amber-500 mr-2">Luxe</span>
            <span>Shop</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-slate-700 hover:text-amber-500 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-slate-700 hover:text-amber-500 transition-colors">
              Products
            </Link>
            <Link to="/categories" className="text-slate-700 hover:text-amber-500 transition-colors">
              Categories
            </Link>
            <Link to="/about" className="text-slate-700 hover:text-amber-500 transition-colors">
              About
            </Link>
          </nav>

          {/* Search Form */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full py-2 pl-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-500"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Cart and Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleCart}
              className="relative p-2 text-slate-700 hover:text-amber-500 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={24} />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {state.itemCount}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={toggleMobileMenu} 
              className="md:hidden p-2 text-slate-700"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className={`mt-4 md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full py-2 pl-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-500"
            >
              <Search size={18} />
            </button>
          </form>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden mt-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <nav className="flex flex-col space-y-4 bg-white rounded-lg p-4 shadow-lg">
            <Link 
              to="/" 
              className="text-slate-700 hover:text-amber-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-slate-700 hover:text-amber-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/categories" 
              className="text-slate-700 hover:text-amber-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className="text-slate-700 hover:text-amber-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;