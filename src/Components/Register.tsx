
import { useContext, useState, type FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { 
  Box, Button, TextField, Typography, Paper, Container 
} from '@mui/material';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { authService } from '../services/authService';

interface RegisterProps {}
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
const Register: FunctionComponent<RegisterProps> = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext)!;
    
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const data = await authService.registerAndLogin(name, email, password);
           login(data.token, data.user);
            Toast.fire({
        icon: 'success',
        title: 'ברוך הבא!',
        text: 'החשבון נוצר והתחברת בהצלחה',
        timer: 2500,
        showConfirmButton: false,
        timerProgressBar: true,
      });

            navigate('/dashboard');
        }
        catch (error) {
    console.error("שגיאה בהרשמה", error);
    Toast.fire({
        icon: 'error',
        iconColor: '#f87171', 
        title: 'פרטים לא תקינים',
        text: 'נא לוודא שכל השדות מולאו כראוי',
        confirmButtonText: 'הבנתי',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });
}
    }

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
            <Container maxWidth="xs">
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
                            הרשמה
                        </Typography>
                        
                        <form onSubmit={handleRegister}>
                            <TextField
                                fullWidth 
                                label="שם משתמש" 
                                variant="outlined" 
                                margin="normal"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <TextField
                                fullWidth 
                                label="אימייל" 
                                variant="outlined" 
                                margin="normal"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <TextField
                                fullWidth 
                                label="סיסמה" 
                                type="password" 
                                variant="outlined" 
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                sx={{ mb: 3 }}
                            />
                            <Button 
                                fullWidth 
                                size="large" 
                                type="submit" 
                                variant="contained" 
                                sx={{ py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
                            >
                                הרשם למערכת
                            </Button>
                        </form>

                        <Box sx={{ mt: 3 }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                כבר יש לך חשבון?
                            </Typography>
                            <Button 
                                onClick={() => navigate('/login')} 
                                sx={{ textTransform: 'none', color: 'secondary.main', mt: 1 }}
                            >
                                חזור להתחברות
                            </Button>
                        </Box>
                    </Paper>
                </motion.div>
            </Container>
        </Box>
    );
}

export default Register;