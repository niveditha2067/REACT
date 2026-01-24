import CommentList from './CommentList';
import CommentForm from './CommentForm';
import styles from './CommentSystem.module.css';

const CommentSystem = ({ comments, onAddComment, isLoggedIn, userName }) => {
  return (
    <div className={styles.commentSystem}>
      <h4>Comments</h4>
      <CommentList comments={comments} />
      <CommentForm
        onSubmit={onAddComment}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />
    </div>
  );
};

export default CommentSystem;
