import { createContext, useEffect, useState } from "react";
import * as authService from '../api/auth';

export const AuthContext = createContext({
    user: {},
    isAuthenticated: false,
    hasRole: null,
    login: () => { },
    logout: () => { },
});

function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hasRole, setRole] = useState(null);

    useEffect(() => {

    });

    const setInitial = () => {
        setUser({});
        setIsAuthenticated(false);
        setRole(null);
    }

    const login = async (username, password) => {
        try {
            const data = await authService.login(username, password);
            setUser(data);
            setIsAuthenticated(true);
            setRole(data.hasRole)
        } catch (err) {
            setInitial();
        }
    }
    const logout = () => {
        setInitial();
    }

    const context = { user, isAuthenticated, hasRole, login, logout };

    return <AuthContext.Provider value={context}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;