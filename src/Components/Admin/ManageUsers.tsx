
import { useContext, useEffect, useState, type FunctionComponent } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import type { User } from "../../Models/User";
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import Sidebar from '.././Sidebar';
import Navbar from '.././Navbar';
import { ticketService } from "../../services/ticketService";
import UserForm from "./AddUserForm";
import UserTable from "./UserTable";

// הגדרת הטיפוס לשליחת נתונים
interface CreateUserData {
    name: string;
    email: string;
    password?: string;
    role: string;
}

const ManageUsers: FunctionComponent = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error'
    });

    const { token, user } = useContext(AuthContext)!;
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role !== 'admin') navigate('/');
    }, [user, navigate]);
//מבקש מהשרת את רשימת המשתמשים
    const fetchUsers = async () => {
        if (!token) return;
        try {
            const data = await ticketService.getUsers(token);
            setUsers(data);
        } catch (err) { console.error(err); }
    };

    const handleCreateUser = async (userData: CreateUserData) => {
        if (!token) return;
        try {
            await ticketService.createUser(userData, token);
            fetchUsers(); 
            setSnackbar({ open: true, message: 'המשתמש נוצר בהצלחה!', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: 'שגיאה ביצירת המשתמש', severity: 'error' });
        }
    };

    useEffect(() => { if (token) fetchUsers(); }, [token]);

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#0f172a', overflow: 'hidden' }}>
            <Sidebar />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', direction: 'rtl', overflowY: 'auto', marginLeft: '260px' }}>
                <Navbar />
                <Box sx={{ p: 4, maxWidth: '1400px', mx: 'auto', width: '100%' }}>
                    
                    <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold', mb: 6, textAlign: 'center' }}>
                        ניהול משתמשים
                    </Typography>

                    {/* טופס הוספת משתמשים */}
                    <UserForm onUserCreated={handleCreateUser} />

                    <Typography variant="h5" sx={{ color: '#fff', mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
                        רשימת משתמשים קיימים
                    </Typography>

                    {/* הטבלה שמציגה את המשתמשים */}
                    <UserTable users={users} />

                    <Snackbar 
                        open={snackbar.open} 
                        autoHideDuration={4000} 
                        onClose={() => setSnackbar({ ...snackbar, open: false })}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
                            {snackbar.message}
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>
        </Box>
    );
}

export default ManageUsers;