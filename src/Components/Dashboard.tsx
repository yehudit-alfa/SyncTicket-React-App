
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
    Box, Container, Typography, Paper, Button, Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/ListAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Dashboard = () => {
    const {  user } = useContext(AuthContext)!;
    const navigate = useNavigate();

    if (!user) return null;
    const {  role } = user;

    const getRoleColor = () => {
        if (role === 'admin') return '#f87171';
        if (role === 'agent') return '#fbbf24';
        return '#22d3ee';
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%', bgcolor: '#0f172a' }}>
            <Sidebar />
            <Box sx={{
                flex: 1, display: 'flex', flexDirection: 'column', direction: 'rtl', minWidth: 0, marginLeft: '260px'
            }}>
                <Navbar />

                {/* מרכז העמוד */}
                <Box sx={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    p: 3
                }}>
                    <Container maxWidth="md">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <Typography variant="h3" sx={{ mb: 6, fontWeight: '900', textAlign: 'center' }}>
                                מרכז השליטה
                            </Typography>

                            <Paper sx={{
                                p: { xs: 4, md: 8 },
                                borderRadius: 6,
                                bgcolor: '#1e293b',
                                borderLeft: `8px solid ${getRoleColor()}`,
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <Box sx={{ maxWidth: '600px', width: '100%' }}>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: getRoleColor(), mb: 2 }}>
                                        {role === 'customer' ? 'ניהול פניות שירות' : role === 'agent' ? 'ניהול פניות' : 'ניהול מערכת'}
                                    </Typography>

                                    <Typography variant="h6" sx={{ color: '#cbd5e1', fontWeight: 400, lineHeight: 1.6, mb: 4 }}>
                                        {role === 'customer' && "המערכת מסנכרנת את הנתונים שלך בזמן אמת מול צוות השירות."}
                                        {role === 'agent' && "פניות הממתינות לטיפולך המקצועי."}
                                        {role === 'admin' && "ניהול משתמשים והגדרות מערכת."}
                                    </Typography>

                                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 4 }} />

                                    <Box sx={{
                                        display: 'flex',
                                        gap: 3,
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        justifyContent: 'center',
                                        width: '100%'
                                    }}>
                                        {role === 'customer' && (
                                            <>
                                                <Button
                                                    variant="contained"
                                                    size="large"
                                                    startIcon={<AddIcon sx={{ ml: 1 }} />}
                                                    onClick={() => navigate('/tickets/new')}
                                                    sx={{ bgcolor: '#a855f7', py: 2, px: 4, borderRadius: 3, fontWeight: 'bold', minWidth: '200px' }}
                                                >
                                                    פנייה חדשה
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    size="large"
                                                    startIcon={<ListIcon sx={{ ml: 1 }} />}
                                                    onClick={() => navigate('/tickets')}
                                                    sx={{ color: '#fff', borderColor: '#475569', py: 2, px: 4, borderRadius: 3, minWidth: '200px' }}
                                                >
                                                    הפניות שלי
                                                </Button>
                                            </>
                                        )}

                                        {role === 'agent' && (
                                            <Button
                                                variant="contained"
                                                size="large"
                                                startIcon={<ListIcon sx={{ ml: 1 }} />}
                                                onClick={() => navigate('/tickets')}
                                                sx={{ bgcolor: getRoleColor(), color: '#000', py: 2, px: 6, fontWeight: 'bold', borderRadius: 3 }}
                                            >
                                                לרשימת הטיקטים
                                            </Button>
                                        )}

                                        {role === 'admin' && (
                                            <>
                                                <Button
                                                    variant="contained"
                                                    size="large"
                                                    startIcon={<ListIcon sx={{ ml: 1 }} />}
                                                    onClick={() => navigate('/tickets')}
                                                    sx={{ bgcolor: '#4f46e5', py: 2, px: 4, borderRadius: 3, fontWeight: 'bold' }}
                                                >
                                                    כל הטיקטים
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    size="large"
                                                    component={Link} to="/admin"
                                                    startIcon={<SettingsIcon sx={{ ml: 1 }} />}
                                                    sx={{ color: '#fff', borderColor: '#475569', py: 2, px: 4, borderRadius: 3 }}
                                                >
                                                    הגדרות
                                                </Button>
                                            </>
                                        )}
                                    </Box>
                                </Box>
                            </Paper>
                        </motion.div>
                    </Container>
                </Box>
            </Box>
        </Box>

    );
};

export default Dashboard;