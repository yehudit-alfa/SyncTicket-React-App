import React from 'react';
import { 
    Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Box, Typography, Stack, Avatar 
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import type { User } from '../../Models/User'; 

interface UserTableProps {
    users: User[];
}

const roleColors = {
    admin: '#f87171',
    agent: '#fbbf24',
    customer: '#22d3ee'
};
//פה אני מציגה טבלה של משתמשים עם עיצוב מיוחד לכל תפקיד
const UserTable: React.FC<UserTableProps> = ({ users }) => {
    return (
        <TableContainer component={Paper} sx={{ bgcolor: '#1e293b', borderRadius: 3, border: '1px solid rgba(255,255,255,0.05)' }}>
            <Table sx={{ direction: 'rtl', tableLayout: 'fixed' }}>
                <TableHead sx={{ bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
                    <TableRow>
                        <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold', textAlign: 'center', width: '25%' }}>תפקיד</TableCell>
                        <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold', textAlign: 'center', width: '25%' }}>אימייל</TableCell>
                        <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold', textAlign: 'center', width: '25%' }}>משתמש</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((u) => (
                        <TableRow key={u.id} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' } }}>
                            <TableCell sx={{ textAlign: 'center' }}>
                                <Box sx={{
                                    bgcolor: roleColors[u.role] || roleColors.customer,
                                    color: '#fff', px: 2, py: 0.5, borderRadius: '20px',
                                    fontSize: '0.75rem', fontWeight: 'bold', display: 'inline-flex',
                                    minWidth: '70px', justifyContent: 'center'
                                }}>
                                    {u.role}
                                </Box>
                            </TableCell>

                            <TableCell sx={{ color: '#cbd5e1', textAlign: 'center' }}>{u.email}</TableCell>

                            <TableCell>
                                <Stack direction="row-reverse" alignItems="center" justifyContent="center" spacing={3}>
                                    <Avatar sx={{ bgcolor: roleColors[u.role] || roleColors.customer, width: 35, height: 35 }}>
                                        <PersonIcon sx={{ fontSize: 20 }} />
                                    </Avatar>
                                    <Typography variant="body2" sx={{ color: '#fff', fontWeight: 'medium', pl: 1 }}>
                                        {u.name}
                                    </Typography>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserTable;