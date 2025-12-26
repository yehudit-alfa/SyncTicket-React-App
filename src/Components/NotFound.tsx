
import { Box, Typography, Button, Container } from "@mui/material";
import type { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface NotFoundProps {}

const NotFound: FunctionComponent<NotFoundProps> = () => {
    const navigate = useNavigate();

    return (
        <Box 
            sx={{ 
                height: '100vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                bgcolor: '#0f172a', 
                color: '#fff',
                textAlign: 'center',
                direction: 'rtl'
            }}
        >
            <Container maxWidth="sm">
                <ErrorOutlineIcon sx={{ fontSize: 100, color: '#3b82f6', mb: 2, opacity: 0.8 }} />
                
                <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: '6rem', mb: 1, color: '#3b82f6' }}>
                    404
                </Typography>
                
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                    אופס! הדף לא נמצא 😕
                </Typography>
                
                <Typography sx={{ color: '#94a3b8', mb: 4, fontSize: '1.1rem' }}>
                    נראה שהכתובת שהקלדת לא קיימת או שהיא הוסרה מהמערכת. 
                    אל דאגה, תמיד אפשר לחזור למקום מבטחים.
                </Typography>

                <Button 
                    variant="contained" 
                    size="large"
                    onClick={() => navigate('/dashboard')}
                    sx={{ 
                        bgcolor: '#3b82f6', 
                        padding: '12px 30px',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        textTransform: 'none',
                        '&:hover': { bgcolor: '#2563eb' }
                    }}
                >
                    חזרה ללוח הבקרה
                </Button>
            </Container>
        </Box>
    );
}

export default NotFound;