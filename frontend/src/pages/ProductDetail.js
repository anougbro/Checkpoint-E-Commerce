import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { addToCart } from '../store/slices/cartSlice';
import { productsAPI } from '../services/api';
import '../styles/ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productsAPI.getById(id);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      dispatch(addToCart({ product, quantity }));
      toast.success(`${product.name} added to cart!`);
      setQuantity(1);
    }
  };

  if (loading) {
    return <div className="product-detail-page loading">Loading...</div>;
  }

  if (!product) {
    return <div className="product-detail-page">Product not found</div>;
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image || 'https://via.placeholder.com/500'];

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-gallery">
          <div className="main-image">
            <img src={images[selectedImage]} alt={product.name} />
          </div>
          <div className="thumbnail-images">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} ${index}`}
                className={selectedImage === index ? 'active' : ''}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="product-details">
          <div className="product-header">
            <h1>{product.name}</h1>
            <span className="category-badge">{product.category}</span>
          </div>

          <div className="product-rating">
            <span className="stars">{'⭐'.repeat(Math.round(product.rating))}</span>
            <span className="rating-value">{product.rating}/5</span>
            <span className="reviews-count">({product.reviews?.length || 0} reviews)</span>
          </div>

          <div className="product-pricing">
            <span className="price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                <span className="discount">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          <div className="product-stock">
            <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-options">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="quantity-input"
              />
            </div>
          </div>

          <div className="product-actions">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="btn btn-primary btn-lg"
            >
              <FiShoppingCart /> Add to Cart
            </button>
            <button className="btn btn-secondary btn-lg">
              <FiHeart /> Add to Wishlist
            </button>
          </div>

          <div className="product-info-box">
            <h3>Product Information</h3>
            <ul>
              <li><strong>SKU:</strong> {product._id}</li>
              <li><strong>Category:</strong> {product.category}</li>
              <li><strong>Seller:</strong> {product.seller || 'EShop'}</li>
              <li><strong>Shipping:</strong> Free shipping on orders over $50</li>
              <li><strong>Returns:</strong> 30-day return policy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="reviews-section">
        <h2>Customer Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="reviews-list">
            {product.reviews.map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-header">
                  <h4>{review.name}</h4>
                  <span className="review-rating">{'⭐'.repeat(review.rating)}</span>
                </div>
                <p>{review.comment}</p>
                <small>{new Date(review.createdAt).toLocaleDateString()}</small>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet. Be the first to review this product!</p>
        )}
      </section>
    </div>
  );
}

export default ProductDetail;
