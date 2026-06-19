import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiTrash2 } from 'react-icons/fi';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import '../styles/Cart.css';

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, quantity: parseInt(quantity) }));
    }
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <h1>Your Cart is Empty</h1>
          <p>Start shopping to add items to your cart</p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Shopping Cart</h1>

        <div className="cart-content">
          <div className="cart-items">
            <table className="items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id} className="cart-item">
                    <td className="product-info">
                      <img src={item.image || 'https://via.placeholder.com/80'} alt={item.name} />
                      <div>
                        <h4>{item.name}</h4>
                        <p className="item-category">{item.category}</p>
                      </div>
                    </td>
                    <td className="price">${item.price.toFixed(2)}</td>
                    <td className="quantity">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                        className="quantity-input"
                      />
                    </td>
                    <td className="item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="action">
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="btn-icon btn-delete"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-item">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Shipping:</span>
              <span>${totalPrice > 100 ? 0 : 10}</span>
            </div>
            <div className="summary-item">
              <span>Tax (10%):</span>
              <span>${(totalPrice * 0.1).toFixed(2)}</span>
            </div>
            <div className="summary-total">
              <span>Total:</span>
              <span>${(totalPrice + (totalPrice > 100 ? 0 : 10) + (totalPrice * 0.1)).toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="btn btn-primary btn-lg btn-full"
            >
              Proceed to Checkout
            </button>

            <Link to="/products" className="btn btn-secondary btn-lg btn-full">
              Continue Shopping
            </Link>

            <button
              onClick={() => dispatch(clearCart())}
              className="btn btn-danger btn-lg btn-full"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
