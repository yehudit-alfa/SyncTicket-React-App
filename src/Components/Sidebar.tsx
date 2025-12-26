
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout, user } = useContext(AuthContext)!;

    const menuItems = [
        { text: 'הפרופיל שלי', icon: <PeopleIcon />, path: '/profile' },
        { text: 'לוח בקרה', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'הפניות שלי', icon: <ConfirmationNumberIcon />, path: '/tickets' },
    ];

    if (user?.role === 'customer') {
        menuItems.push({ text: 'פתיחת פניה', icon: <AddCircleIcon />, path: '/tickets/new' });
    }

    if (user?.role === 'admin') {
        menuItems.push({ text: 'הגדרות', icon: <SettingsIcon />, path: '/admin' });
    }

    return (
        <Box sx={{
            width: 260,
            minWidth: 260,
            maxWidth: 260,
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bgcolor: '#1e293b',
            color: '#fff',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            borderRight: '1px solid rgba(255,255,255,0.1)',
            zIndex: 1200,
            overflow: 'hidden'
        }}>
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: '900', color: '#a855f7', letterSpacing: 2 }}>
                    HELP-DESK
                </Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    מערכת ניהול פניות
                </Typography>
            </Box>

            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.05)', mb: 2 }} />

            <List sx={{
                flexGrow: 1,
                px: 2,
                overflowY: 'auto',
                '&::-webkit-scrollbar': { width: '4px' },
                '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '10px' }
            }}>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.text}
                        onClick={() => navigate(item.path)}
                        selected={location.pathname === item.path}
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                            py: 1.5,
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            '&.Mui-selected': {
                                bgcolor: 'rgba(168, 85, 247, 0.2)',
                                color: '#a855f7',
                                '& .MuiListItemIcon-root': { color: '#a855f7' }
                            },
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                        }}
                    >
                        <ListItemIcon sx={{ color: '#94a3b8', minWidth: 'auto' }}>
                            {item.icon}
                        </ListItemIcon>

                        <ListItemText
                            primary={item.text}
                            sx={{
                                textAlign: 'left',
                                '& .MuiTypography-root': { fontSize: '0.95rem', fontWeight: 500 }
                            }}
                        />
                    </ListItemButton>
                ))}
            </List>

            <Box sx={{
                p: 2,
                mt: 'auto',
                bgcolor: '#1e293b'
            }}>
                <ListItemButton
                    onClick={logout}
                    sx={{
                        borderRadius: 2,
                        color: '#f87171',
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        justifyContent: 'space-between',
                        py: 1.5,
                        '&:hover': { bgcolor: 'rgba(248, 113, 113, 0.1)' }
                    }}
                >
                    <ListItemIcon sx={{ color: '#f87171', minWidth: 'auto' }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="התנתקות" sx={{ textAlign: 'left' }} />
                </ListItemButton>
            </Box>
        </Box>
    );
};

export default Sidebar;