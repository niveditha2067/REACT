import React, { useState, useEffect } from 'react';
import styles from './BlogPostForm.module.css';

const BlogPostForm = ({ post, onSubmit }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [author, setAuthor] = useState(post?.author || '');
  const [date, setDate] = useState(post?.date || '');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prefill form fields if editing an existing post
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setAuthor(post.author);
      setDate(post.date);
    }
  }, [post]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Required';
    if (!content.trim()) newErrors.content = 'Required';
    if (!author.trim()) newErrors.author = 'Required';
    if (!date.trim()) newErrors.date = 'Required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await onSubmit({ title, content, author, date });
      // Optionally clear form or redirect here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.blogPostForm} onSubmit={handleSubmit} noValidate>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-describedby={errors.title ? 'title-error' : undefined}
          aria-invalid={!!errors.title}
          disabled={isSubmitting}
        />
        {errors.title && (
          <p id="title-error" className={styles.error} role="alert">
            {errors.title}
          </p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          aria-describedby={errors.content ? 'content-error' : undefined}
          aria-invalid={!!errors.content}
          disabled={isSubmitting}
        />
        {errors.content && (
          <p id="content-error" className={styles.error} role="alert">
            {errors.content}
          </p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          aria-describedby={errors.author ? 'author-error' : undefined}
          aria-invalid={!!errors.author}
          disabled={isSubmitting}
        />
        {errors.author && (
          <p id="author-error" className={styles.error} role="alert">
            {errors.author}
          </p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="date">Publication Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          aria-describedby={errors.date ? 'date-error' : undefined}
          aria-invalid={!!errors.date}
          disabled={isSubmitting}
        />
        {errors.date && (
          <p id="date-error" className={styles.error} role="alert">
            {errors.date}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={styles.submitButton}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default BlogPostForm;
