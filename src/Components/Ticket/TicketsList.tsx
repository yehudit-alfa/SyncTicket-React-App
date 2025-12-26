
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '.././Sidebar';
import Navbar from '.././Navbar';
import { Box, Typography, Stack, Alert, Snackbar, Fade } from '@mui/material';

import type { Ticket } from '../../Models/Ticket';
import type { User } from '../../Models/User';
import type { Priority } from '../../Models/Priority';
import type { Status } from '../../Models/Status';
import { ticketService } from '../../services/ticketService';
import TicketFilterBar from '.././Ticket/TicketFilterBar';
import TicketCard from '.././Ticket/TicketCard';

const TicketsList = () => {
    const { token, user, tickets, setTickets } = useContext(AuthContext)!;
    const [agents, setAgents] = useState<User[]>([]);
    const [priorities, setPriorities] = useState<Priority[]>([]);
    const [statuses, setStatuses] = useState<Status[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string | number>('all');
    const [priorityFilter, setPriorityFilter] = useState<string | number>('all');
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error'
    });

    const navigate = useNavigate();
    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    const fetchTickets = async () => {
        try {
            if (!token) return;
            const allTickets = await ticketService.getAllTickets(token);
            let filtered: Ticket[] = [];
            
            if (user?.role === 'admin') {
                filtered = allTickets;
            } else if (user?.role === 'agent') {
                filtered = allTickets.filter((t: Ticket) => String(t.assigned_to) === String(user.id));
            } else {
                filtered = allTickets.filter((t: Ticket) => String(t.created_by) === String(user?.id));
            }
            setTickets(filtered);
        } catch (err) {
            console.error("שגיאה בטעינת טיקטים", err);
        }
    };

    const fetchStaticData = async () => {
        if (!token) return;
        try {
            if (user?.role === 'admin') {
                const allUsers = await ticketService.getUsers(token);
                setAgents(allUsers.filter((u: User) => u.role === 'agent'));
            }
            const [prioritiesData, statusesData] = await Promise.all([
                ticketService.getPriorities(token),
                ticketService.getStatuses(token)
            ]);
            setPriorities(prioritiesData);
            setStatuses(statusesData);
        } catch (err) {
            console.error("שגיאה בטעינת נתונים סטטיים", err);
        }
    };

    const updateTicket = async (ticketId: number, updateData: object) => {
        try {
            if (!token) return;
            await ticketService.updateTicket(ticketId, updateData, token);
            fetchTickets();
            setSnackbar({ open: true, message: "הפנייה עודכנה בהצלחה!", severity: "success" });
        } catch (err) {
            setSnackbar({ open: true, message: "העדכון נכשל", severity: "error" });
        }
    };

    const deleteTicket = async (ticketId: number) => {
        if (!window.confirm("האם את בטוחה שברצונך למחוק את הטיקט?")) return;
        try {
            if (!token) return;
            await ticketService.updateTicket(ticketId, { status_id: 2 }, token); // נניח ש-2 זה סטטוס מבוטל/ארכיון
            setTickets(tickets.filter(t => Number(t.id) !== ticketId));
            setSnackbar({ open: true, message: "הפנייה הוסרה בהצלחה", severity: "success" });
        } catch (err) {
            alert("לא ניתן למחוק טיקט זה");
        }
    };

    const filteredTickets = tickets.filter((t: Ticket) => {
        const matchesSearch = (t.subject || "").toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || String(t.status_id) === String(statusFilter);
        const matchesPriority = priorityFilter === 'all' || String(t.priority_id) === String(priorityFilter);
        return matchesSearch && matchesStatus && matchesPriority;
    });

    useEffect(() => {
        if (token) {
            fetchTickets();
            fetchStaticData();
        }
    }, [token]);

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%', bgcolor: '#0f172a' }}>
            <Sidebar />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', direction: 'rtl', marginLeft: '260px' }}>
                <Navbar />

                <Box sx={{ p: { xs: 2, md: 4 }, width: '100%', boxSizing: 'border-box' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                        <Typography sx={{ color: '#94a3b8', fontSize: '1.1rem' }}>
                            נמצאו {filteredTickets.length} פניות
                        </Typography>
                        <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold' }}>
                            {user?.role === 'admin' ? 'ניהול פניות' : 'הפניות שלי'}
                        </Typography>
                    </Stack>

                    <TicketFilterBar 
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        priorityFilter={priorityFilter}
                        setPriorityFilter={setPriorityFilter}
                        statuses={statuses}
                        priorities={priorities}
                    />

                    <Stack spacing={1.5}>
                        {filteredTickets.length === 0 ? (
                            <Fade in={true} timeout={1000}>
                                <Box sx={{ 
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                    minHeight: '200px', bgcolor: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px' 
                                }}>
                                    <Typography sx={{ color: '#94a3b8', fontSize: '1.1rem' }}>
                                        אין נתונים להצגה
                                    </Typography>
                                </Box>
                            </Fade>
                        ) : (
                            filteredTickets.map((t, index) => (
                                <TicketCard 
                                    key={t.id}
                                    ticket={t}
                                    index={index}
                                    userRole={user?.role}
                                    agents={agents}
                                    statuses={statuses}
                                    priorities={priorities}
                                    onNavigate={(id) => navigate(`/tickets/${id}`)}
                                    onUpdate={updateTicket}
                                    onDelete={deleteTicket}
                                />
                            ))
                        )}
                    </Stack>
                </Box>

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={4000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled">
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default TicketsList;