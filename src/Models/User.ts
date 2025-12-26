export interface User {
    id: string ;
    name: string;
    email: string;
    role: 'admin' | 'agent' | 'customer';
    is_active?: number;
    created_at?: string;
}
// interface User {
//     id: string;
//     name: string;
//     role: string;
//     email: string;
// }