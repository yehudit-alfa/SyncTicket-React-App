import { Card, CardContent, Stack, Box, Typography, IconButton, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Ticket } from '../../Models/Ticket';
import type { User } from '../../Models/User';
import type { Status } from '../../Models/Status';
import type { Priority } from '../../Models/Priority';

interface TicketCardProps {
    ticket: Ticket;
    index: number;
    userRole?: string;
    agents: User[];
    statuses: Status[];
    priorities: Priority[];
    onNavigate: (id: number) => void;
    onUpdate: (id: number, data: object) => void;
    onDelete: (id: number) => void;
}

const TicketCard = ({ 
    ticket, index, userRole, agents, statuses, priorities, 
    onNavigate, onUpdate, onDelete 
}: TicketCardProps) => {
    return (
        <Card
            onClick={() => onNavigate(Number(ticket.id))}
            sx={{
                width: '100%', bgcolor: '#1e293b', borderRadius: 2,
                border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer',
                '&:hover': { bgcolor: '#232f42', borderColor: '#3b82f6' }
            }}
        >
            <CardContent sx={{ py: 1.5, px: 3, '&:last-child': { pb: 1.5 } }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%', direction: 'rtl' }}>
                    
                    {/* פעולות מנהל/נציג */}
                    <Box sx={{ display: 'flex', flexShrink: 0, alignItems: 'flex-start', gap: '12px' }} onClick={(e) => e.stopPropagation()}>
                        {userRole === 'admin' && (
                            <IconButton
                                onClick={() => onDelete(Number(ticket.id))}
                                sx={{
                                    color: '#ef4444', p: 1, marginRight: '10px', marginLeft: '5px', marginTop: '22px',
                                    bgcolor: 'rgba(239, 68, 68, 0.05)', '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.15)' }
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        )}

                        {userRole === 'admin' && (
                            <Box sx={{ width: '120px' }}>
                                <Typography variant="caption" sx={{ color: '#64748b', display: 'block', textAlign: 'center', mb: 0.5 }}>הקצאת נציג</Typography>
                                <Select
                                    value={agents.some(a => a.id === ticket.assigned_to) ? ticket.assigned_to : ''}
                                    onChange={(e) => onUpdate(Number(ticket.id), { assigned_to: e.target.value })}
                                    MenuProps={{ disableScrollLock: true }}
                                    sx={{
                                        color: '#fff', height: '35px', fontSize: '0.8rem', bgcolor: 'rgba(255,255,255,0.05)', width: '100%',
                                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                                    }}
                                >
                                    <MenuItem value=""><em>ללא</em></MenuItem>
                                    {agents.map(a => <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>)}
                                </Select>
                            </Box>
                        )}

                        <Box sx={{ width: '100px' }}>
                            <Typography variant="caption" sx={{ color: '#64748b', display: 'block', textAlign: 'center', mb: 0.5 }}>סטטוס</Typography>
                            <Select
                                value={statuses.some(s => s.id === ticket.status_id) ? ticket.status_id : ''}
                                onChange={(e) => onUpdate(Number(ticket.id), { status_id: e.target.value })}
                                MenuProps={{ disableScrollLock: true }}
                                sx={{
                                    color: '#fff', height: '35px', fontSize: '0.8rem', bgcolor: 'rgba(255,255,255,0.05)', width: '100%',
                                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                                }}
                            >
                                {statuses.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
                            </Select>
                        </Box>

                        <Box sx={{ width: '100px' }}>
                            <Typography variant="caption" sx={{ color: '#64748b', display: 'block', textAlign: 'center', mb: 0.5 }}>עדיפות</Typography>
                            <Select
                                value={priorities.some(p => p.id === ticket.priority_id) ? ticket.priority_id : ''}
                                onChange={(e) => onUpdate(Number(ticket.id), { priority_id: e.target.value })}
                                MenuProps={{ disableScrollLock: true }}
                                sx={{
                                    color: '#fff', height: '35px', fontSize: '0.8rem', bgcolor: 'rgba(255,255,255,0.05)', width: '100%',
                                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                                }}
                            >
                                {priorities.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
                            </Select>
                        </Box>
                    </Box>

                    {/* תוכן הטיקט */}
                    <Box sx={{ flexGrow: 1, minWidth: 0, textAlign: 'left', px: 2 }}>
                        <Typography noWrap sx={{ color: '#fff', fontSize: '1.05rem', fontWeight: 600 }}>
                            {ticket.subject}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#94a3b8', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {ticket.description}
                        </Typography>
                    </Box>

                    {/* מספר סידורי */}
                    <Box sx={{ minWidth: '40px', textAlign: 'left' }}>
                        <Typography sx={{ color: '#a855f7', fontWeight: 'bold', fontSize: '1.2rem' }}>
                            {index + 1}
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default TicketCard;