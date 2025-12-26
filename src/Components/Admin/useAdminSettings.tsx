// שמתי שתי פונקציות של הוספת סטטוס חדש והוספת עדיפות חדשה כי הם היו ממש דומות
import { useState } from 'react';

export const useAddSetting = (addFn: (name: string, token: string) => Promise<any>, token: string | null, fetchSettingsData: () => void) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token || !name.trim()) return;

        setLoading(true);
        setError('');
        try {
            await addFn(name, token);
            setName(''); 
            fetchSettingsData(); 
        } catch (err) {
            setError('שגיאה בהוספה , אנא נסה שוב.');
        } finally {
            setLoading(false);
        }
    };

    return { name, setName, handleAdd, loading, error };
};
