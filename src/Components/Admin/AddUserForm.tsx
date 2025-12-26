import React, { useState } from 'react';
import { Card, Typography, Stack, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// הגדרת הטיפוסים בצורה מקצועית (במקום any)
interface UserFormData {
    name: string;
    email: string;
    password?: string;
    role: string;
}

interface UserFormProps {
    onUserCreated: (userData: UserFormData) => Promise<void>;
}

const UserForm: React.FC<UserFormProps> = ({ onUserCreated }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('agent');

    const inputStyle = {
        flex: 1, 
        bgcolor: '#0f172a', 
        borderRadius: 1,
        '& input': { color: '#fff', textAlign: 'left', direction: 'ltr' },
        '& label': { color: '#94a3b8', left: 15, right: 'auto', transformOrigin: 'left' }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onUserCreated({ name, email, password, role });
        setName(''); setEmail(''); setPassword(''); setRole('agent');
    };

    return (
        <Card sx={{ bgcolor: '#1e293b', p: 4, borderRadius: 3, mb: 6, border: '1px solid rgba(255,255,255,0.05)' }}>
            <Typography variant="h6" sx={{ color: '#3b82f6', mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
                הוספת משתמש חדש
            </Typography>

            <form onSubmit={handleSubmit}>
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ width: '100%', direction: 'ltr' }}
                >
                    <TextField
                        label="שם מלא"
                        variant="filled"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        sx={inputStyle}
                    />
                    <TextField
                        label="אימייל"
                        type="email"
                        variant="filled"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        sx={inputStyle}
                    />
                    <TextField
                        label="סיסמה"
                        type="password"
                        variant="filled"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        sx={inputStyle}
                    />

                    <FormControl variant="filled" sx={{ flex: 1, bgcolor: '#0f172a', borderRadius: 1 }}>
                        <InputLabel sx={{ color: '#94a3b8', left: 15, right: 'auto', transformOrigin: 'left' }}>תפקיד</InputLabel>
                        <Select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            sx={{ color: '#fff', '& .MuiSelect-select': { textAlign: 'left', direction: 'ltr' } }}
                        >
                            <MenuItem value="customer">לקוח</MenuItem>
                            <MenuItem value="agent">נציג</MenuItem>
                            <MenuItem value="admin">מנהל</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ minWidth: '180px', bgcolor: '#3b82f6', fontWeight: 'bold', height: '56px', borderRadius: 2 }}
                    >
                        <PersonAddIcon sx={{ ml: 1 }} />
                        צור משתמש
                    </Button>
                </Stack>
            </form>
        </Card>
    );
};

export default UserForm;