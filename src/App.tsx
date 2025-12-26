
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import TicketsList from './Components/Ticket/TicketsList';
import CreateTicket from './Components/Ticket/CreateTicket';
import NotFound from './Components/NotFound';
import TicketDetails from './Components/Ticket/TicketDetails';
import Register from './Components/Register';
import ProtectedRoute from './Components/ProtectedRoute';
import AdminSettings from './Components/Admin/AdminSettings';
import ManageUsers from './Components/Admin/ManageUsers';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import Profile from './Components/Profile';
//הפונקציה luxuryTheme קשורה לעיצוב הכללי של האתר
const luxuryTheme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'dark',
    primary: { main: '#a855f7' },
    secondary: { main: '#22d3ee' },
    background: { default: '#0f172a', paper: '#1e293b' },
  },
  typography: {
    fontFamily: 'Assistant, sans-serif',
  },
  components: {}, 
});
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
function App() {
  return (
    // 2. עטיפת כל האפליקציה ב-ThemeProvider
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={luxuryTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* ניתובים לכל העמודים באלקציה שלי ולכל עמוד יש הרשאות ProtectedRoute משלו */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['admin', 'agent', 'customer']}><Dashboard /></ProtectedRoute>} />
          <Route path="/tickets" element={<ProtectedRoute allowedRoles={['admin', 'agent', 'customer']}><TicketsList /></ProtectedRoute>} />
          <Route path="/tickets/new" element={<ProtectedRoute allowedRoles={['customer']}><CreateTicket /></ProtectedRoute>} />
          <Route path="/tickets/:id" element={<ProtectedRoute allowedRoles={['admin', 'agent', 'customer']}><TicketDetails /></ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />
          <Route path="/manage-users" element={<ProtectedRoute allowedRoles={['admin']}><ManageUsers /></ProtectedRoute>} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </ThemeProvider>
    </CacheProvider>
  );
}

export default App;