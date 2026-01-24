// src/App.js
import React, { useState } from 'react';
import BlogPostForm from './components/BlogPostForm/BlogPostForm';
import BlogList from './components/BlogList';
import Layout from './components/Layout/Layout';
import './components/CommentSystem/CommentSystem.module.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState(null);

  const handleBlogPostSubmit = async (data) => {
    setPosts((prev) => [...prev, data]);
  };

  const handleDelete = (idx) => {
    setPosts((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    const lower = query.toLowerCase();
    const results = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lower) ||
        post.content.toLowerCase().includes(lower)
    );
    setSearchResults(results);
  };

  return (
    <Layout onSearch={handleSearch}>
      <BlogPostForm onSubmit={handleBlogPostSubmit} />
      <BlogList posts={searchResults !== null ? searchResults : posts} onDelete={handleDelete} />
      {searchResults !== null && searchResults.length === 0 && (
        <div style={{ color: '#888', marginTop: '2rem', textAlign: 'center' }}>No posts found.</div>
      )}
    </Layout>
  );
}

export default App;
