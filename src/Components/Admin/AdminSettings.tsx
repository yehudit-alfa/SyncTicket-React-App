
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import type { Priority } from '../../Models/Priority';
import type { Status } from '../../Models/Status';
import { Box, Typography, TextField, Button, Stack, Card, Chip, Snackbar, Alert } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import Sidebar from '.././Sidebar';
import Navbar from '.././Navbar';
import { ticketService } from '../../services/ticketService';
import { useAddSetting } from '.././Admin/useAdminSettings';
const AdminSettings: React.FC = () => {
    const { token } = useContext(AuthContext)!;
    const navigate = useNavigate();
    const [priorities, setPriorities] = useState<Priority[]>([]);
    const [statuses, setStatuses] = useState<Status[]>([]);
    const [message, setMessage] = useState('');
    // פונקציה לשליפת נתוני ההגדרות
    const fetchSettingsData = async () => {
        if (!token) return;
        try {
            const dataP = await ticketService.getPriorities(token);
            setPriorities(dataP);
            const dataS = await ticketService.getStatuses(token);
            setStatuses(dataS);
        } catch (err) {
            console.error("שגיאה בטעינת נתונים", err);
        }
    };
    // פונקציה להוספת עדיפות חדשה
    const handleAddPriority = useAddSetting(ticketService.addPriority, token, () => {
        fetchSettingsData();
        setMessage('העדיפות נוספה בהצלחה!');
    });
    // פונקציה להוספת סטטוס חדש
    const handleAddStatus = useAddSetting(ticketService.addStatus, token, () => {
        fetchSettingsData();
        setMessage('הסטטוס נוסף בהצלחה!');
    });
    useEffect(() => {
        if (token) fetchSettingsData();
    }, [token]);
    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#0f172a', overflow: 'hidden' }}>
            <Sidebar />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', direction: 'rtl', overflowY: 'auto', marginLeft: '260px' }}>
                <Navbar />
                <Box sx={{ p: 4, maxWidth: '900px', mx: 'auto', width: '100%' }}>
                    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 6 }}>
                        <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 2 }}>
                            <SettingsIcon sx={{ fontSize: 35, color: '#8b5cf6' }} />
                            הגדרות מערכת
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => navigate('/manage-users')}
                            startIcon={<PeopleIcon sx={{ ml: 1 }} />}
                            sx={{
                                position: 'absolute', left: 0,
                                bgcolor: '#6366f1', borderRadius: '25px', px: 3, fontWeight: 'bold',
                                '&:hover': { bgcolor: '#4f46e5' }
                            }}>
                            ניהול משתמשים
                        </Button>
                    </Box>
                    <Stack spacing={5}>
                        {/* כרטיס עדיפויות */}
                        <Card sx={{ bgcolor: '#1e293b', p: 4, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                            <Typography variant="h6" sx={{ color: '#a78bfa', mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
                                עדיפויות
                            </Typography>

                            <form onSubmit={handleAddPriority.handleAdd}>
                                <Stack direction="row" spacing={2} sx={{ mb: 4, direction: 'ltr' }}>

                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="שם עדיפות (למשל: דחוף)"
                                        value={handleAddPriority.name}
                                        onChange={(e) => handleAddPriority.setName(e.target.value)}
                                        required
                                        sx={{
                                            bgcolor: '#0f172a', borderRadius: 1,
                                            '& input': { color: '#fff', textAlign: 'left', direction: 'ltr' },
                                            '& label': { color: '#94a3b8', left: 15, right: 'auto', transformOrigin: 'left' }
                                        }}
                                    />
                                    <Button
                                        type="submit"
                                        disabled={handleAddPriority.loading}
                                        variant="contained"
                                        sx={{ bgcolor: '#8b5cf6', borderRadius: '20px', px: 4, fontWeight: 'bold' }}
                                    >
                                        הוסף
                                    </Button>
                                </Stack>
                            </form>

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'left' }}>
                                {priorities.map(p => (
                                    <Chip
                                        key={p.id}
                                        label={p.name}
                                        sx={{
                                            bgcolor: 'rgba(139, 92, 246, 0.15)',
                                            color: '#c4b5fd',
                                            fontWeight: 'bold',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(139, 92, 246, 0.3)'
                                        }}
                                    />
                                ))}
                            </Box>
                        </Card>

                        {/* כרטיס סטטוסים */}
                        <Card sx={{ bgcolor: '#1e293b', p: 4, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                            <Typography variant="h6" sx={{ color: '#a78bfa', mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
                                סטטוסים
                            </Typography>

                            <form onSubmit={handleAddStatus.handleAdd}>
                                <Stack direction="row" spacing={2} sx={{ mb: 4, direction: 'ltr' }}>

                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="שם סטטוס חדש"
                                        value={handleAddStatus.name}
                                        onChange={(e) => handleAddStatus.setName(e.target.value)}
                                        required
                                        sx={{
                                            bgcolor: '#0f172a', borderRadius: 1,
                                            '& input': { color: '#fff', textAlign: 'left', direction: 'ltr' },
                                            '& label': { color: '#94a3b8', left: 15, right: 'auto', transformOrigin: 'left' }
                                        }}
                                    />
                                    <Button
                                        type="submit"
                                        disabled={handleAddPriority.loading}
                                        variant="contained"
                                        sx={{ bgcolor: '#8b5cf6', borderRadius: '20px', px: 4, fontWeight: 'bold' }}
                                    >
                                        הוסף
                                    </Button>
                                </Stack>
                            </form>

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'left' }}>
                                {statuses.map(s => (
                                    <Chip
                                        key={s.id}
                                        label={s.name}
                                        sx={{
                                            bgcolor: 'rgba(139, 92, 246, 0.15)',
                                            color: '#c4b5fd',
                                            fontWeight: 'bold',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(139, 92, 246, 0.3)'
                                        }}
                                    />
                                ))}
                            </Box>
                        </Card>
                    </Stack>
                </Box>
            </Box>

            <Snackbar open={!!message} autoHideDuration={3000} onClose={() => setMessage('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity={message.includes('שגיאה') ? 'error' : 'success'} sx={{ borderRadius: '10px' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AdminSettings;