
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, TextField, Typography, Paper, Container
} from '@mui/material';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { authService } from '../services/authService';
const Toast = Swal.mixin({
  background: '#1e293b',
  color: '#fff',
  confirmButtonColor: '#a855f7',
  width: '380px',
  padding: '1.5rem',
  customClass: {
    confirmButton: 'clean-swal-button'
  },
  didOpen: (toast) => {
    toast.style.borderRadius = '20px';

    const confirmBtn = toast.querySelector('.swal2-confirm') as HTMLElement;
    if (confirmBtn) {
      confirmBtn.style.outline = 'none';
      confirmBtn.style.boxShadow = 'none';
    }
  }
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await authService.login(email, password);
      const { token, user } = data;
      login(token, user);
      Toast.fire({
        icon: 'success',
        title: 'התחברת בהצלחה',
        toast: true,
        position: 'top',
        timer: 2000,
        showConfirmButton: false,

      });
      navigate('/dashboard');
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: 'ההתחברות נכשלה',
        text: 'אימייל או סיסמה אינם נכונים',
        confirmButtonText: 'נסה שוב',
        iconColor: '#f87171',
      });
    }
  };
  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      position: 'fixed',
      top: 0,
      left: 0
    }}>
      <Container maxWidth="xs" sx={{ zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={24}
            sx={{
              p: 4,
              borderRadius: 5,
              textAlign: 'center',
              backgroundColor: 'background.paper',
              border: '1px solid rgba(168, 85, 247, 0.2)'
            }}
          >
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
              התחברות
            </Typography>

            <form onSubmit={handleLogin}>
              <TextField
                fullWidth label="אימייל" variant="outlined" margin="normal"
                value={email} onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth label="סיסמה" type='password'
                variant="outlined" margin="normal"
                value={password} onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 3 }}
                
              />
              <Button
                fullWidth size="large" type="submit" variant="contained"
                sx={{ py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
              >
                התחבר למערכת
              </Button>
            </form>

            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>עוד לא נרשמת?</Typography>
              <Button
                onClick={() => navigate('/register')}
                sx={{ textTransform: 'none', color: 'secondary.main', mt: 1 }}
              >
                ליצירת חשבון לקוח חדש לחץ כאן
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;