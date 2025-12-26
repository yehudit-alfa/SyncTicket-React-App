import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import type { Priority } from '../../Models/Priority';
import {
    Box, Typography, Paper, TextField, Button,
    MenuItem, Select, FormControl, InputLabel, CircularProgress, Stack
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import Navbar from '.././Navbar';
import { ticketService } from '../../services/ticketService';
import Sidebar from '.././Sidebar';

const CreateTicket: React.FC = () => {
    const { token } = useContext(AuthContext)!;
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [priorities, setPriorities] = useState<Priority[]>([]);
    const [selectedPriority, setSelectedPriority] = useState<number | string>('');

    useEffect(() => {
        
        const fetchPriorities = async () => {
                            if (!token) return

            try {
                const data = await ticketService.getPriorities(token);
                setPriorities(data);
               
                if (data.length > 0) setSelectedPriority(data[0].id);
                 
            } catch (err) { console.error(err); }
        };
        if (token) fetchPriorities();
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
                    if (!token) return;

        try {
            await ticketService.createTicket({subject: title,description,status_id: 1,priority_id: Number(selectedPriority)}, token);
            Swal.fire({ icon: 'success', title: 'הפנייה נשלחה בהצלחה!', background: '#1e293b', color: '#fff', confirmButtonColor: '#a855f7' });
            navigate('/tickets');
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'שגיאה בשליחה', background: '#1e293b', color: '#fff' });
        } finally { setLoading(false); }
    };

return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%', bgcolor: '#0f172a' }}>
        <Sidebar />
        {/* תוכן העמוד */}
        <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            direction: 'rtl', 
            minWidth: 0, 
            marginLeft: '260px' 
        }}>
            <Navbar />

            <Box sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ width: '100%', maxWidth: '550px' }}
                >
                    {/* כפתור חזרה */}
                    <Button
                        onClick={() => navigate(-1)}
                        variant="outlined"
                        startIcon={<ArrowBackIcon sx={{ ml: 1, transform: 'rotate(180deg)' }} />}
                        sx={{
                            mb: 3,
                            color: '#94a3b8',
                            borderColor: 'rgba(148, 163, 184, 0.3)',
                            borderRadius: '10px',
                            '&:hover': { borderColor: '#fff', color: '#fff', bgcolor: 'rgba(255,255,255,0.05)' }
                        }}
                    >
                        חזרה ללוח הבקרה
                    </Button>

                    <Paper elevation={24} sx={{
                        p: { xs: 4, md: 6 },
                        borderRadius: 8,
                        bgcolor: '#1e293b',
                        borderTop: '6px solid #a855f7',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
                    }}>
                        <Typography variant="h4" sx={{ mb: 1, fontWeight: '900', textAlign: 'center', color: '#fff' }}>
                            פתיחת פנייה
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 4, textAlign: 'center', color: '#94a3b8' }}>
                            מלא את הפרטים ונחזור אליך בהקדם
                        </Typography>

                        <form onSubmit={handleSubmit}>
                            <Stack spacing={3}>
                                {/* נושא הפנייה   */}
                                <TextField
                                    fullWidth
                                    label="נושא הפנייה"
                                    variant="filled"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    sx={{ bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}
                                    slotProps={{
                                        input: { sx: { color: '#fff', textAlign: 'left', direction: 'ltr' } },
                                        inputLabel: { sx: { color: '#94a3b8', textAlign: 'left', width: '100%', left: 0, right: 'auto' } }
                                    }}
                                />

                                {/* עדיפות -     */}
                                <FormControl fullWidth variant="filled" sx={{ bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                                    <InputLabel sx={{ color: '#94a3b8', textAlign: 'left', width: '100%', left: 0, right: 'auto' }}>עדיפות</InputLabel>
                                    <Select
                                        value={selectedPriority}
                                        onChange={(e) => setSelectedPriority(e.target.value)}
                                        MenuProps={{
                                            disableScrollLock: true,
                                            PaperProps: {
                                                sx: { bgcolor: '#1e293b', color: '#fff' }
                                            }
                                        }}
                                        sx={{ 
                                            color: '#fff', 
                                            textAlign: 'left',
                                            direction: 'ltr',
                                            '.MuiSelect-icon': { color: '#94a3b8', right: 7, left: 'auto' } 
                                        }}
                                    >
                                        {priorities.map((p) => (
                                            <MenuItem key={p.id} value={p.id} sx={{ justifyContent: 'flex-start', direction: 'ltr' }}>
                                                {p.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* תיאור הבעיה ל */}
                                <TextField
                                    fullWidth
                                    label="תיאור הבעיה"
                                    multiline
                                    rows={4}
                                    variant="filled"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    sx={{ bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}
                                    slotProps={{
                                        input: { sx: { color: '#fff', textAlign: 'left', direction: 'ltr' } },
                                        inputLabel: { sx: { color: '#94a3b8', textAlign: 'left', width: '100%', left: 0, right: 'auto' } }
                                    }}
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                    size="large"
                                    endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon sx={{ mr: 1, ml: 0 }} />}
                                    sx={{
                                        py: 2,
                                        bgcolor: '#a855f7',
                                        borderRadius: 3,
                                        fontWeight: 'bold',
                                        fontSize: '1.1rem',
                                        '&:hover': { bgcolor: '#9333ea' }
                                    }}
                                >
                                    {loading ? 'שולח פנייה...' : 'שלח פנייה'}
                                </Button>
                            </Stack>
                        </form>
                    </Paper>
                </motion.div>
            </Box>
        </Box>
    </Box>
);
};

export default CreateTicket;