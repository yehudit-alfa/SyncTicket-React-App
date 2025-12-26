
import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
    Box, Typography, Card, Stack, TextField,
    Button, Divider, Paper, IconButton, Chip, Avatar,
    Snackbar,
    Alert
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PersonIcon from '@mui/icons-material/Person';
import Sidebar from '.././Sidebar';
import Navbar from '.././Navbar';
import type { Ticket } from '../../Models/Ticket';
import { ticketService } from '../../services/ticketService';

// פונקציה לייצור צבע ייחודי וקבוע לכל משתמש לפי ה-ID שלו
const getAvatarColor = (authorId: number) => {
    const colors = [
        '#ef4444', // אדום
        '#3b82f6', // כחול
        '#fbbf24', // צהוב
        '#10b981', // ירוק
        '#a855f7', // סגול
        '#f472b6', // ורוד
        '#22d3ee', // תכלת
        '#fb923c', // כתום
    ];
    if (authorId === 1) return '#f87171';
    if (authorId === 2) return '#fbbf24';
    if (authorId === 3) return '#22d3ee';
    return colors[authorId % colors.length];
};

const TicketDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token, user } = useContext(AuthContext)!;
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState("");
const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });
    const fetchTicketData = async () => {
        if (!id || !token) return;
        try {
            const [ticketData, commentsData] = await Promise.all([
                ticketService.getTicketById(id, token),
                ticketService.getComments(id, token)
            ]);
            setTicket(ticketData);
            setComments(commentsData);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { if (id && token) fetchTicketData(); }, [id, token]);

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        if (!id || !token) return;
        try {
            await ticketService.addComment(id, newComment, token);
            setNewComment("");
            fetchTicketData();
        } catch (err) { setSnackbar({ 
            open: true, 
            message: "שגיאה בשליחת התגובה", 
            severity: "error" 
        }); }
    };

    if (!ticket) return null;

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#0f172a', overflow: 'hidden' }}>
            <Sidebar />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', direction: 'rtl', minWidth: 0, marginLeft: '260px' }}>
                <Navbar />

                <Box sx={{ flex: 1, overflowY: 'auto', p: 4, pb: '200px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, position: 'relative' }}>
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ position: 'absolute', right: 0 ,gap: 1.5}}>
                            <IconButton onClick={() => navigate('/tickets')} sx={{ color: '#94a3b8' }}>
                                <ArrowBackIosNewIcon />
                            </IconButton>
                            <Typography variant="h6" sx={{ color: '#3b82f6', fontWeight: 'bold'}}>
                                #{id}
                            </Typography>
                        </Stack>

                        <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold', mx: 'auto' }}>
                            {ticket.subject}
                        </Typography>
                        <Stack
                            direction="row"
                            sx={{
                                position: 'absolute',
                                left: 24,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                alignItems: 'center',
                            }}
                        >
                            <Chip
                                label={ticket.priority_name}
                                sx={{
                                    bgcolor: '#f76161ff',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    borderRadius: '12px',
                                    height: '32px',
                                    px: 1,
                                }}
                            />

                            <Chip
                                label={ticket.status_name}
                                sx={{
                                    bgcolor: '#3b82f6',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    borderRadius: '12px',
                                    height: '32px',
                                    px: 1,
                                    mr: 3, 
                                }}
                            />
                        </Stack>
                    </Box>

                    {/* תיאור הפנייה */}
                    <Card sx={{ bgcolor: '#1e293b', p: 3, mb: 4, borderRadius: 3, border: '1px solid rgba(255,255,255,0.05)' }}>
                        <Typography sx={{
                            color: '#e2e8f0',
                            lineHeight: 1.7,
                            textAlign: 'center',
                            whiteSpace: 'pre-wrap'
                        }}>
                            {ticket.description}
                        </Typography>
                    </Card>

                    <Divider sx={{ mb: 4, borderColor: 'rgba(255,255,255,0.1)' }}>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>שיחת הפנייה</Typography>
                    </Divider>

                    {/* רשימת תגובות */}
                    <Stack spacing={4}>
                        {comments.map((comment) => {
                            // בודק אם "אני" כתבתי כדי לקבוע את צד ההודעה
                            const isMe = comment.author_name === user?.name;
                            const userColor = getAvatarColor(comment.author_id);

                            return (
                                <Box key={comment.id} sx={{
                                    display: 'flex',
                                    flexDirection: isMe ? 'row' : 'row-reverse',
                                    alignItems: 'flex-start',
                                    gap: 2,
                                    alignSelf: isMe ? 'flex-start' : 'flex-end',
                                }}>
                                    {/* אוואטר בצבע ייחודי לכותב */}
                                    <Avatar sx={{ bgcolor: userColor, width: 40, height: 40 }}>
                                        <PersonIcon />
                                    </Avatar>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-start' : 'flex-end' }}>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', mb: 0.5 }}>
                                            <span style={{ color: '#94a3b8', fontWeight: 'bold' }}>{comment.author_name}</span>
                                            • {new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </Typography>
                                        <Paper sx={{
                                            p: 2,
                                            borderRadius: isMe ? '0px 20px 20px 20px' : '20px 0px 20px 20px',
                                            bgcolor: isMe ? '#374151' : '#1e293b',
                                            color: '#fff',
                                            maxWidth: '500px',

                                        }}>
                                            <Typography variant="body2" sx={{
                                                textAlign: 'left',
                                                whiteSpace: 'pre-wrap'
                                            }}>
                                                {comment.content}
                                            </Typography>
                                        </Paper>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Stack>
                </Box>

                {/* Footer - כתיבת תגובה */}
                <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    p: 3,
                    bgcolor: '#111827',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    zIndex: 100
                }}>
                    <Stack
                        direction="row"
                        sx={{
                            maxWidth: '1200px',
                            mx: 'auto',
                            alignItems: 'center',
                            width: '100%',
                            marginLeft: '260px'
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={handleAddComment}
                            disabled={!newComment.trim()}
                            sx={{
                                minWidth: '130px',
                                height: '56px',
                                borderRadius: 2,
                                bgcolor: '#3b82f6',
                                ml: 4,
                                flexShrink: 0,
                                '&:hover': { bgcolor: '#2563eb' },
                            }}
                        >
                            <Typography sx={{ fontWeight: 'bold', ml: 1 }}>שלח</Typography>
                            <SendIcon sx={{ fontSize: 18, transform: 'rotate(180deg)' }} />
                        </Button>

                        <TextField
                            fullWidth
                            multiline
                            minRows={1}
                            maxRows={5}
                            placeholder="כתוב תגובה"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            sx={{
                                bgcolor: '#1f2937',
                                borderRadius: 2,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { border: 'none' },
                                    minHeight: '56px',
                                    padding: '12px 16px',
                                },
                                '& .MuiInputBase-input': {
                                    textAlign: 'left',
                                    direction: 'ltr ',
                                    color: '#fff',
                                    lineHeight: '1.5'
                                }
                            }}
                        />
                    </Stack>
                </Box>
                <Snackbar 
                open={snackbar.open} 
                autoHideDuration={4000} 
                onClose={handleCloseSnackbar} 
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbar.severity} 
                    variant="filled" 
                    sx={{ width: '100%', fontWeight: 'bold' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
            </Box>
        </Box>
    );
};

export default TicketDetails;