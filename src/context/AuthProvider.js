import { createContext, useCallback, useEffect, useState } from "react";
import { getCurrentUserService } from "../api/user";
import { getToken, removeToken, setToken } from "../utils/token";

export const AuthContext = createContext({
    isInitialised: false,
    user: {},
    isAuthenticated: false,
    hasRoles: [],
    setAuthData: async () => { },
    resetAuthData: () => { },
});

function AuthProvider({ children }) {
    const [isInitialised, setIsInitialised] = useState(false);
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hasRoles, setRoles] = useState([]);

    console.log(user, hasRoles, isInitialised,  isAuthenticated);

    const initialiseData = useCallback(async () => {
        if(getToken()) {
            await setAuthData();
        }
        setIsInitialised(true);
    }, []);

    useEffect(() => {
        initialiseData();
    }, [initialiseData]);

    const setAuthData = async (token) => {
        if(token) {
            setToken(token);
        }
        const data = await getCurrentUserService();
        setUser(data);
        setIsAuthenticated(true);
        setRoles(data.roles);
    }

    const resetAuthData = () => {
        removeToken();
        setUser({});
        setIsAuthenticated(false);
        setRoles(null);
    }

    const context = { isInitialised, user, isAuthenticated, hasRoles, setAuthData, resetAuthData };

    return <AuthContext.Provider value={context}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;