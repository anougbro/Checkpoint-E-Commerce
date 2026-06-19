import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productsAPI } from '../services/api';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsAPI.getAll({ limit: 8, featured: true });
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to EShop</h1>
          <p>Discover amazing products at unbeatable prices</p>
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/products')}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          <div className="category-card">
            <div className="category-icon">👕</div>
            <h3>Fashion</h3>
          </div>
          <div className="category-card">
            <div className="category-icon">💻</div>
            <h3>Electronics</h3>
          </div>
          <div className="category-card">
            <div className="category-icon">🏠</div>
            <h3>Home & Garden</h3>
          </div>
          <div className="category-card">
            <div className="category-icon">⚽</div>
            <h3>Sports</h3>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Promotions Section */}
      <section className="promotions">
        <div className="promo-card promo-1">
          <h3>Summer Sale</h3>
          <p>Up to 50% off</p>
        </div>
        <div className="promo-card promo-2">
          <h3>Free Shipping</h3>
          <p>On orders over $50</p>
        </div>
        <div className="promo-card promo-3">
          <h3>Easy Returns</h3>
          <p>30-day return policy</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
