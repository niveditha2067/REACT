import React, { useEffect, useState } from 'react';
import CommentSystem from './CommentSystem/CommentSystem';

function BlogList({ posts, onDelete }) {
  const [comments, setComments] = useState([]);

  // Ensure comments array matches posts length
  useEffect(() => {
    setComments((prev) => {
      if (prev.length === posts.length) return prev;
      // Fill with empty arrays for new posts
      return posts.map((_, i) => prev[i] || []);
    });
  }, [posts]);

  const handleAddComment = (postIdx, comment) => {
    setComments((prev) => {
      const updated = prev.map((arr, i) =>
        i === postIdx
          ? [
              ...arr,
              {
                ...comment,
                date: new Date(),
                avatar: comment.name ? `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.name)}&background=random` : undefined,
              },
            ]
          : arr
      );
      return updated;
    });
  };

  if (!posts.length) return <p>No posts yet.</p>;
  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {posts.map((post, idx) => (
          <li key={idx} style={{ marginBottom: 20, border: '1px solid #ccc', padding: 10 }}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p><b>Author:</b> {post.author} | <b>Date:</b> {post.date}</p>
            <button onClick={() => onDelete(idx)}>Delete</button>
            <CommentSystem
              comments={comments[idx] || []}
              onAddComment={(comment) => handleAddComment(idx, comment)}
              isLoggedIn={false}
              userName={''}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
