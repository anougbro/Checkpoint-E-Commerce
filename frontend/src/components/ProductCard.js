import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={product.image || 'https://via.placeholder.com/250x250?text=Product'} 
          alt={product.name} 
        />
        {product.featured && <span className="featured-badge">Featured</span>}
      </div>

      <div className="product-info">
        <h3 className="product-name">
          <Link to={`/products/${product._id}`}>{product.name}</Link>
        </h3>

        <div className="product-rating">
          {'⭐'.repeat(Math.round(product.rating))} 
          <span className="rating-text">({product.rating}/5)</span>
        </div>

        <p className="product-description">{product.description.substring(0, 100)}...</p>

        <div className="product-price">
          <span className="price">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <div className="product-actions">
          <button className="btn btn-primary" onClick={handleAddToCart}>
            <FiShoppingCart /> Add to Cart
          </button>
          <button className="btn btn-icon">
            <FiHeart />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
