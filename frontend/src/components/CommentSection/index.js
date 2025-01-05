import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import Toastbox from '../Toastbox';

const CommentSection = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim().length > 0) {
      onAddComment(newComment);
      setNewComment('');
    } else {
      Toastbox("error", "Yorum boş olamaz.");
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, padding: 3 }}>
      <Typography variant="h6" gutterBottom>Yorumlar:</Typography>

      <Box
        sx={{
          maxHeight: 300,
          overflowY: 'auto',
          border: '1px solid #ddd',
          borderRadius: 2,
          padding: 2,
          marginBottom: 2,
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
      </Box>

      {/* Yeni Yorum Ekle */}
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
