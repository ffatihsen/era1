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
import { postSignin } from '../Services';
import Toastbox from '../components/Toastbox';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

   
    if (email.includes('@') && password.length >= 6) {
      

      try {

        let res = await postSignin({email,password })
        if(res.status == 200){
          localStorage.setItem('token', res.data.token);
          Toastbox("success", "Success!")
          navigate('/feed'); 
        }
        
      } catch (error) {
        if(error.response.data?.error){
          Toastbox("error", error.response.data.error)
        }
        else{
          Toastbox("error", "An unexpected error occurred!")
        }
      }


    } else {
      setError('Invalid email address or password.');
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
          Giriş Yap
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-posta Adresi"
            name="email"
            autoComplete="email"
            autoFocus
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
           Login
          </Button>
          <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
            <Link
              href="#"
              underline="hover"
              color="text.secondary"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot your password?
            </Link>
            <Link
              href="#"
              underline="hover"
              color="text.secondary"
              onClick={() => navigate('/signup')}
            >
              Don't have an account? Sign up
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
    
    </>

  );
}
