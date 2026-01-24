import React, { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Debounce search for dynamic updates
  React.useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit} role="search" aria-label="Search blog posts">
      <label htmlFor="search-input" className={styles.srOnly}>Search posts</label>
      <input
        id="search-input"
        type="text"
        className={styles.searchInput}
        placeholder="Search posts..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        autoComplete="off"
      />
      <button type="submit" className={styles.searchButton} aria-label="Search">
        <span aria-hidden="true">🔍</span>
      </button>
    </form>
  );
};

export default SearchBar;
