import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { 
    Box, Typography, Paper, Avatar, Stack, 
    Divider, Container, Chip
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BadgeIcon from '@mui/icons-material/Badge';

const Profile = () => {
    const { user } = useContext(AuthContext)!;

    if (!user) return null;

    const getRoleStyles = (role: string) => {
        switch (role) {
            case 'admin': return { color: '#f87171', label: 'ADMIN' };
            case 'agent': return { color: '#fbbf24', label: 'AGENT' };
            default: return { color: '#22d3ee', label: 'CUSTOMER' };
        }
    };

    const roleStyle = getRoleStyles(user.role || '');

    const infoItems = [
        { icon: <BadgeIcon fontSize="small" />, label: 'שם מלא', value: user.name },
        { icon: <MailOutlineIcon fontSize="small" />, label: 'כתובת אימייל', value: user.email },
        { icon: <VerifiedUserIcon fontSize="small" />, label: 'הרשאות מערכת', value: user.role === 'admin' ? 'מנהל מערכת' : 'משתמש' }
    ];

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0f172a', width: '100%' }}>
            <Sidebar />
             <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', direction: 'rtl', overflowY: 'auto', marginLeft: '260px' }}>
                <Navbar />

                <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
                    <Paper sx={{ 
                        borderRadius: 6,
                        bgcolor: '#1e293b', 
                        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                        overflow: 'hidden',
                        textAlign: 'center' 
                    }}>
                        <Box sx={{ height: '130px', bgcolor: '#0f172a', opacity: 0.6 }} />
                        
                        <Box sx={{ p: 4, mt: -10 }}>
                            <Avatar 
                                sx={{ 
                                    width: 110, height: 110, 
                                    bgcolor: roleStyle.color, 
                                    border: '6px solid #1e293b',
                                    margin: '0 auto',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
                                }}
                            >
                                <PersonIcon sx={{ fontSize: '3.8rem', color: '#fff' }} />
                            </Avatar>
                            
                            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, mt: 2.5 }}>
                                {user.name}
                            </Typography>
                            
                            <Chip 
                                label={roleStyle.label}
                                sx={{ 
                                    mt: 2,
                                    bgcolor: roleStyle.color,
                                    color: '#fff',
                                    fontWeight: '900',
                                    fontSize: '0.75rem',
                                    px: 2,
                                    height: '28px',
                                    borderRadius: '50px',
                                    boxShadow: `0 4px 14px ${roleStyle.color}44`,
                                    '& .MuiChip-label': { px: 2 }
                                }}
                            />

                            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.05)', my: 5, mx: 8 }} />

                            <Stack spacing={5} sx={{ mb: 4 }}>
                                {infoItems.map((item, index) => (
                                    <Box key={index}>
                                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, display: 'block', mb: 1, letterSpacing: 0.5 }}>
                                            {item.label}
                                        </Typography>
                                        
                                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 500, fontSize: '1.15rem' }}>
                                            {item.value}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    </Paper>

                    <Typography variant="caption" sx={{ color: '#334155', textAlign: 'center', display: 'block', mt: 4, fontWeight: 500 }}>
                        SECURE ADMIN PANEL • 2025
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default Profile;