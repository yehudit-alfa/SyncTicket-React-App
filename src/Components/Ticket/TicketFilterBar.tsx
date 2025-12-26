import { Stack, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { Priority } from '../../Models/Priority';
import type { Status } from '../../Models/Status';

interface FilterBarProps {
    searchTerm: string;
    setSearchTerm: (val: string) => void;
    statusFilter: string | number;
    setStatusFilter: (val: string | number) => void;
    priorityFilter: string | number;
    setPriorityFilter: (val: string | number) => void;
    statuses: Status[];
    priorities: Priority[];
}

const TicketFilterBar = ({
    searchTerm, setSearchTerm,
    statusFilter, setStatusFilter,
    priorityFilter, setPriorityFilter,
    statuses, priorities
}: FilterBarProps) => {
    return (
        <Stack direction="row" spacing={2} sx={{ mb: 3, direction: 'ltr' }}>
            <TextField
                placeholder="חיפוש לפי נושא"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: '#64748b' }} />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        color: '#fff',
                        bgcolor: '#0f172a',
                        borderRadius: '12px',
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                        '&:hover fieldset': { borderColor: '#3b82f6' },
                    },
                }}
            />

            <FormControl sx={{ minWidth: 150 }}>
                <InputLabel sx={{ color: '#64748b', fontSize: '0.8rem' }}>Status</InputLabel>
                <Select
                    label="Status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    MenuProps={{ disableScrollLock: true }}
                    sx={{
                        height: 56, color: '#fff', bgcolor: '#0f172a', borderRadius: '12px',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
                    }}
                >
                    <MenuItem value="all">כל הסטטוסים</MenuItem>
                    {statuses.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
                </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }}>
                <InputLabel sx={{ color: '#64748b', fontSize: '0.8rem' }}>Priority</InputLabel>
                <Select
                    label="Priority"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    MenuProps={{ disableScrollLock: true }}
                    sx={{
                        height: 56, color: '#fff', bgcolor: '#0f172a', borderRadius: '12px',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
                    }}
                >
                    <MenuItem value="all">כל העדיפויות</MenuItem>
                    {priorities.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
                </Select>
            </FormControl>
        </Stack>
    );
};

export default TicketFilterBar;