import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PrimarySearchAppBar from '../components/Navbar';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    
    if (password !== confirmPassword) {
      setError('Şifreler uyuşmuyor!');
      return;
    }

    // Fake backend request simulation (Replace with actual API call)
    if (username && email.includes('@') && password.length >= 6) {
      
      console.log('User registered:', { username, email });
      navigate('/signin'); 
    } else {
      setError('Lütfen tüm alanları doğru şekilde doldurun.');
    }
  };

  return (

    <>

<PrimarySearchAppBar />


        <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', 
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 4,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
          Üye Ol
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Kullanıcı Adı"
            name="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-posta Adresi"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Şifre"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Şifre Tekrarı"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" sx={{ mt: 1, mb: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: 'primary.main',
              ':hover': { backgroundColor: 'primary.dark' },
            }}
          >
            Kayıt Ol
          </Button>
          <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
            <Link
              href="#"
              underline="hover"
              color="text.secondary"
              onClick={() => navigate('/signin')}
            >
              Hesabınız var mı? Giriş yap
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>

    </>

  );
}
