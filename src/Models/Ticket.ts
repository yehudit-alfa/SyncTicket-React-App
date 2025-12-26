import type { User } from './User';
import type { Comment } from './Comment';

export interface Ticket {
    id: string;
    subject: string;
    status_id: number;
    status_name: 'open' | 'in-progress' | 'closed'; // הגדרה מדויקת של הערכים האפשריים
    description: string;
    assigned_to?: string;
    created_by?: string;// סימן שאלה כי לא תמיד יש נציג
    customer?: User;  // הלקוח שפתח את הטיקט
    priority_id: number;
    priority_name?: string;
    comments?: Comment[];
}