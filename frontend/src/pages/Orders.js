import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ordersAPI } from '../services/api';
import '../styles/Orders.css';

function Orders() {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await ordersAPI.getAll();
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ff9800',
      processing: '#2196f3',
      shipped: '#673ab7',
      delivered: '#4caf50',
      cancelled: '#f44336'
    };
    return colors[status] || '#999';
  };

  if (loading) {
    return <div className="orders-page loading">Loading orders...</div>;
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h1>My Orders</h1>

        {orders.length === 0 ? (
          <div className="no-orders">
            <p>You haven't placed any orders yet</p>
            <Link to="/products" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order._id.substring(0, 8)}</h3>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="order-status">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.orderStatus) }}
                    >
                      {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="order-body">
                  <div className="order-items">
                    <h4>Items ({order.items.length})</h4>
                    {order.items.slice(0, 2).map((item, index) => (
                      <p key={index} className="order-item">
                        {item.name} x {item.quantity}
                      </p>
                    ))}
                    {order.items.length > 2 && (
                      <p className="more-items">
                        and {order.items.length - 2} more items
                      </p>
                    )}
                  </div>

                  <div className="order-details">
                    <div className="detail-row">
                      <span>Total:</span>
                      <strong>${order.total.toFixed(2)}</strong>
                    </div>
                    <div className="detail-row">
                      <span>Payment:</span>
                      <span className={`payment-status ${order.paymentStatus}`}>
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="order-footer">
                  <Link 
                    to={`/orders/${order._id}`}
                    className="btn btn-secondary btn-small"
                  >
                    View Details
                  </Link>
                  {order.orderStatus === 'shipped' && order.trackingNumber && (
                    <div className="tracking-info">
                      <p>Tracking: {order.trackingNumber}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
