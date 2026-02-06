import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { MOCK_DATA } from '../mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            // In a real app, use environment variable for API URL
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { username, password });
            setUser(res.data);
            localStorage.setItem('user', JSON.stringify(res.data));
            return { success: true };
        } catch (error) {
            console.warn("Backend connection failed, trying Demo Mode...");
            // Demo Mode Fallback
            const mockUser = MOCK_DATA.users.find(u => u.username === username && u.password === password);
            if (mockUser) {
                const demoUser = { ...mockUser, isDemo: true };
                setUser(demoUser);
                localStorage.setItem('user', JSON.stringify(demoUser));
                return { success: true, isDemo: true };
            }
            return { success: false, error: error.response?.data?.error || "Login failed" };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
