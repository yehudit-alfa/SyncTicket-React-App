
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; 
import { Box, Paper, Typography, Avatar, IconButton, ButtonBase } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

const Navbar = () => {
    const { logout, user } = useContext(AuthContext)!;
    const navigate = useNavigate(); 

    if (!user) return null;

    const getRoleColor = () => {
        if (user.role === 'admin') return '#f87171';
        if (user.role === 'agent') return '#fbbf24';
        return '#22d3ee';
    };

    return (
        <Paper elevation={0} sx={{
            p: 2, bgcolor: '#1e293b', borderRadius: 0,
            display: 'flex', flexDirection: 'row-reverse',
            justifyContent: 'space-between', alignItems: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            px: { xs: 2, md: 8 },
            width: '100%',
            boxSizing: 'border-box'
        }}>
            {/* עטיפת אזור המשתמש ב-ButtonBase כדי שיהיה לחיץ ונגיש */}
       <ButtonBase 
    onClick={() => navigate('/profile')} 
    sx={{ 
        borderRadius: '12px', 
        p: 1.5, 
        transition: '0.2s', 
        '&:hover': { 
            bgcolor: 'rgba(255,255,255,0.08)', 
        } 
    }}
>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexDirection: 'row-reverse' }}>
        <Avatar sx={{ bgcolor: getRoleColor(), width: 45, height: 45 }}>
            <PersonIcon />
        </Avatar>
        <Box sx={{ textAlign: 'left' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1.2, color: '#fff' }}>
                שלום, {user.name}!
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                דרגת הרשאה: {user.role}
            </Typography>
        </Box>
    </Box>
</ButtonBase>
            <IconButton onClick={logout} sx={{
                color: '#f87171', bgcolor: 'rgba(248, 113, 113, 0.1)',
                '&:hover': { bgcolor: 'rgba(248, 113, 113, 0.2)' }
            }}>
                <LogoutIcon />
            </IconButton>
        </Paper>
    );
};

export default Navbar;