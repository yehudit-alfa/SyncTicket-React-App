import axios from 'axios';
import type { Ticket } from '../Models/Ticket';
import type { User } from '../Models/User';
import type { Priority } from '../Models/Priority';
import type { Status } from '../Models/Status';

const API_URL = 'http://localhost:4000';

export const ticketService = {
    getAllTickets: async (token: string): Promise<Ticket[]> => {
        const res = await axios.get(`${API_URL}/tickets`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    },

    getUsers: async (token: string): Promise<User[]> => {
        const res = await axios.get(`${API_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    },

    getPriorities: async (token: string): Promise<Priority[]> => {
        const res = await axios.get(`${API_URL}/priorities`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    },

    getStatuses: async (token: string): Promise<Status[]> => {
        const res = await axios.get(`${API_URL}/statuses`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    },

    updateTicket: async (id: number, updateData: Partial<Ticket>, token: string): Promise<Ticket> => {
        const res = await axios.patch(`${API_URL}/tickets/${id}`, updateData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    },
    // להוסיף בתוך האובייקט ticketService:
    getTicketById: async (id: string , token: string): Promise<Ticket> => {
        const res = await axios.get(`${API_URL}/tickets/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    },

    getComments: async (id: string , token: string): Promise<any[]> => {
        const res = await axios.get(`${API_URL}/tickets/${id}/comments`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    },

    addComment: async (id: string | number, content: string, token: string) => {
        const res = await axios.post(`${API_URL}/tickets/${id}/comments`, { content }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    },
    createTicket: async (ticketData: { subject: string, description: string, priority_id: number, status_id: number }, token: string) => {
        const res = await axios.post(`${API_URL}/tickets`, ticketData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    },
    addPriority: async (name: string, token: string) => {
        const res = await axios.post(`${API_URL}/priorities`, { name }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    },

    // הוספת סטטוס חדש
    addStatus: async (name: string, token: string) => {
        const res = await axios.post(`${API_URL}/statuses`, { name }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    },
    // יצירת משתמש חדש
    createUser: async (userData: any, token: string) => {
        const res = await axios.post(`${API_URL}/users`, userData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    },

    // מחיקת משתמש
    deleteUser: async (userId: number , token: string) => {
        const res = await axios.delete(`${API_URL}/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    },
};