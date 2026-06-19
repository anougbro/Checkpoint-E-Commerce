import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import { logout } from '../store/slices/authSlice';
import '../styles/Header.css';

function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🛍️</span>
          <span className="logo-text">EShop</span>
        </Link>

        <nav className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="nav-link admin-link">Admin</Link>
          )}
        </nav>

        <div className="header-actions">
          <Link to="/cart" className="cart-link">
            <FiShoppingCart size={24} />
            {items.length > 0 && (
              <span className="cart-badge">{items.length}</span>
            )}
          </Link>

          {user ? (
            <div className="user-menu">
              <Link to="/profile" className="user-icon">
                <FiUser size={24} />
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                <FiLogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
