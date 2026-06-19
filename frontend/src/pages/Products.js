import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { productsAPI } from '../services/api';
import '../styles/Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const LIMIT = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productsAPI.getAll({ 
          page, 
          limit: LIMIT,
          search,
          category: category || undefined
        });
        setProducts(response.data.products);
        setTotal(response.data.total);
        setPages(response.data.pages);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, search, category]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const categories = ['Fashion', 'Electronics', 'Home & Garden', 'Sports', 'Books', 'Toys'];

  return (
    <div className="products-page">
      <div className="products-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="filter-section">
            <h3>Filters</h3>

            <div className="filter-group">
              <label htmlFor="search">Search</label>
              <form onSubmit={handleSearch}>
                <input
                  id="search"
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="btn btn-primary btn-small">
                  Search
                </button>
              </form>
            </div>

            <div className="filter-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                className="category-select"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <button 
              className="btn btn-secondary"
              onClick={() => {
                setSearch('');
                setCategory('');
                setPage(1);
              }}
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="products-main">
          <div className="products-header">
            <h1>Products</h1>
            <p className="results-info">
              Showing {(page - 1) * LIMIT + 1} - {Math.min(page * LIMIT, total)} of {total} products
            </p>
          </div>

          {loading ? (
            <div className="loading">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="no-products">No products found</div>
          ) : (
            <>
              <div className="products-grid">
                {products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="btn btn-secondary"
                  >
                    Previous
                  </button>

                  <div className="page-numbers">
                    {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`page-btn ${page === p ? 'active' : ''}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setPage(Math.min(pages, page + 1))}
                    disabled={page === pages}
                    className="btn btn-secondary"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Products;
