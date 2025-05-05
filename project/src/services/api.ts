import { Product, Category } from '../types';

// Mock product data
const products: Product[] = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and memory foam ear cushions for all-day comfort.',
    price: 249.99,
    image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'electronics',
    rating: 4.8,
    reviews: 423,
    featured: true
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    description: 'Track your fitness goals, receive notifications, and stay connected with our waterproof Smart Watch Pro. Includes heart rate monitoring, sleep tracking, and a 5-day battery life.',
    price: 199.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'electronics',
    rating: 4.6,
    reviews: 287
  },
  {
    id: 3,
    name: 'Ergonomic Office Chair',
    description: 'Work in comfort with our ergonomic office chair. Adjustable lumbar support, breathable mesh back, and customizable armrests make this the perfect addition to any home office.',
    price: 299.99,
    image: 'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'furniture',
    rating: 4.5,
    reviews: 176
  },
  {
    id: 4,
    name: 'Organic Cotton T-Shirt',
    description: 'Ethically sourced, 100% organic cotton t-shirt that feels as good as it looks. Available in multiple colors and sizes.',
    price: 34.99,
    image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'clothing',
    rating: 4.7,
    reviews: 312
  },
  {
    id: 5,
    name: 'Premium Coffee Maker',
    description: 'Brew barista-quality coffee with our premium coffee maker. Programmable settings, built-in grinder, and thermal carafe keep your coffee fresh for hours.',
    price: 159.99,
    image: 'https://images.pexels.com/photos/6804604/pexels-photo-6804604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'kitchen',
    rating: 4.9,
    reviews: 201,
    featured: true
  },
  {
    id: 6,
    name: 'Leather Messenger Bag',
    description: 'Handcrafted from full-grain leather, our messenger bag combines style and functionality. Multiple compartments keep your essentials organized.',
    price: 189.99,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'accessories',
    rating: 4.6,
    reviews: 145
  },
  {
    id: 7,
    name: 'Smart Home Speaker',
    description: 'Control your smart home, play music, and get answers with our voice-activated smart speaker. Features room-filling sound and far-field microphones.',
    price: 129.99,
    image: 'https://images.pexels.com/photos/9779834/pexels-photo-9779834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'electronics',
    rating: 4.7,
    reviews: 278
  },
  {
    id: 8,
    name: 'Stainless Steel Water Bottle',
    description: 'Keep your drinks cold for 24 hours or hot for 12 with our vacuum-insulated water bottle. Durable, leak-proof design is perfect for any adventure.',
    price: 39.99,
    image: 'https://images.pexels.com/photos/1342529/pexels-photo-1342529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'accessories',
    rating: 4.8,
    reviews: 432
  }
];

// Categories
const categories: Category[] = [
  { id: 'all', name: 'All Products' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'furniture', name: 'Furniture' },
  { id: 'clothing', name: 'Clothing' },
  { id: 'kitchen', name: 'Kitchen' },
  { id: 'accessories', name: 'Accessories' }
];

// Simulate API calls
export const fetchProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
};

export const fetchProductById = (id: number): Promise<Product | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = products.find((p) => p.id === id);
      resolve(product || null);
    }, 300);
  });
};

export const fetchCategories = (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categories);
    }, 300);
  });
};

export const searchProducts = (query: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filtered);
    }, 300);
  });
};

export const fetchProductsByCategory = (category: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (category === 'all') {
        resolve(products);
      } else {
        const filtered = products.filter((product) => product.category === category);
        resolve(filtered);
      }
    }, 300);
  });
};