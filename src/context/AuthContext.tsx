import { createContext, useEffect, useReducer, useState, type FunctionComponent, type ReactNode } from "react";
import type { User } from "../Models/User";
import type { Ticket } from "../Models/Ticket";
import { authService } from "../services/authService";

interface AuthState {
    token: string | null;
    user: User | null;
    tickets: Ticket[];
}
//אני מגדירה את הפעולות שהוא יכול לקבל הוא כל פעם חיב לקבל אחד מהם
type AuthAction =
    | { type: 'LOGIN'; payload: { token: string; user: User } }
    | { type: 'LOGOUT' }
    | { type: 'SET_TICKETS'; payload: Ticket[] }
    | { type: 'STOP_LOADING' };
// מה הקונטקסט חושף החוצה
interface AuthContextType extends AuthState {
    login: (token: string, user: User) => void;
    logout: () => void;
    setTickets: (tickets: Ticket[]) => void;
}
//פה זה המקום היחיד שאני יכולה לשנות את הstate 
const authReducer =(state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, token: action.payload.token, user: action.payload.user };
        case 'LOGOUT':
            return { ...state, token: null, user: null, tickets: [] };
        case 'SET_TICKETS':
            return { ...state, tickets: action.payload };
            //מונע קריסה - אם מישהו שולח פעולה לא מוכרת
        default:
            return state;
    }
}
// יצירת ה"צינור" שדרכו יעברו נתוני האבטחה לכל חלקי האפליקציה
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        token: null,
        user: null,
        tickets: []
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const initAuth = async () => {
            const savedToken = localStorage.getItem('token');

            if (savedToken) {
                try {
                    // אנחנו שולחים את הטוקן לשרת כדי שיגיד לנו מי המשתמש
                   const userData = await authService.getCurrentUser(savedToken);

                    // אם הצלחנו, נעדכן את ה-State של האפליקציה
                    dispatch({
                        type: 'LOGIN',
                        payload: { token: savedToken, user: userData }
                    });
                } catch (error) {
                    // אם הטוקן ישן או לא תקין - מנקים הכל
                    localStorage.removeItem('token');
                    dispatch({ type: 'LOGOUT' });
                }
            }
            setLoading(false);

        };

        initAuth();
    }, []);
    const login = (newToken: string, newUser: User) => {
        localStorage.setItem('token', newToken);
        dispatch({ type: 'LOGIN', payload: { token: newToken, user: newUser } });
    };
    const logout = () => {
        // setToken(null);
        // setUser(null);
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
        window.location.href = '/login';
        setLoading(false);

    };
    const setTickets = (tickets: Ticket[]) => {
        dispatch({ type: 'SET_TICKETS', payload: tickets });
    };
    if (loading) return <div>טוען מערכת...</div>;
    return (
        //פה אני מספקת את כל מה שצריך לכל האפליקציה
        <AuthContext.Provider value={{ ...state, login, logout, setTickets }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;