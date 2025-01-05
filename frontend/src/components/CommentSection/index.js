import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import Toastbox from '../Toastbox';

const CommentSection = ({ comments, onAddComment, loadMoreComments, hasMore }) => {
  const [newComment, setNewComment] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // Yüklenme durumu
  const commentsContainerRef = useRef(null);

  const handleAddComment = () => {
    if (newComment.trim().length > 0) {
      onAddComment(newComment);
      setNewComment('');
    } else {
      Toastbox('error', 'Yorum boş olamaz.');
    }
  };

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    const container = commentsContainerRef.current;
    if (container) {
      const isAtBottom =
        container.scrollHeight - container.scrollTop <= container.clientHeight + 1;
      if (isAtBottom) {
        setLoading(true);
        loadMoreComments(page + 1)
          .then(() => {
            setPage((prevPage) => prevPage + 1);
          })
          .finally(() => setLoading(false));
      }
    }
  }, [loading, hasMore, page, loadMoreComments]);

  useEffect(() => {
    const container = commentsContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <Box sx={{ width: '100%', maxWidth: 600, padding: 3 }}>
      <Typography variant="h6" gutterBottom>Yorumlar:</Typography>

      <Box
        ref={commentsContainerRef}
        sx={{
          maxHeight: 300,
          overflowY: 'auto',
          border: '1px solid #ddd',
          borderRadius: 2,
          padding: 2,
          marginBottom: 2,
          position: 'relative',
        }}
      >
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <Box key={index} my={2}>
              <Typography variant="body2">{comment.comment}</Typography>
              <Typography variant="caption" color="textSecondary">
                - {comment.userName} | {new Date(comment.date).toLocaleString()}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            Henüz yorum yapılmamış.
          </Typography>
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}

        {!hasMore && (
          <Typography variant="caption" color="textSecondary" sx={{ display: 'block', textAlign: 'center', marginTop: 2 }}>
            Tüm yorumlar yüklendi.
          </Typography>
        )}
      </Box>

      <Typography variant="h6" gutterBottom>Yorum Ekle:</Typography>
      <TextField
        fullWidth
        label="Yeni Yorum"
        variant="outlined"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        multiline
        rows={4}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleAddComment} fullWidth>
        Yorum Yap
      </Button>
    </Box>
  );
};

export default CommentSection;
