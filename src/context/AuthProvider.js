import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { getCurrentUserService } from "../api/user";
import { roles } from "../constants/roles";
import { getToken, removeToken, setToken } from "../utils/token";

export const AuthContext = createContext({
    isInitialised: false,
    user: {},
    isAuthenticated: false,
    hasRoles: [],
    isAdmin: false,
    setAuthData: async () => { },
    resetAuthData: () => { },
});

function AuthProvider({ children }) {
    const [isInitialised, setIsInitialised] = useState(false);
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hasRoles, setRoles] = useState([]);
    const isAdmin = useMemo(() =>
        !!hasRoles.find((userRole) => userRole.name === roles.ADMIN), [hasRoles]);

    const setAuthData = useCallback(async (token) => {
        if (token) {
            setToken(token);
        }
        const data = await getCurrentUserService();
        if(!data) {
            resetAuthData();
            return;
        }
        setUser(data);
        setIsAuthenticated(true);
        setRoles(data.roles);
    }, []);

    const resetAuthData = () => {
        removeToken();
        setUser({});
        setIsAuthenticated(false);
        setRoles([]);
    }

    const initialiseData = useCallback(async () => {
        if (getToken()) {
            await setAuthData();
        } else {
            resetAuthData();
        }
        setIsInitialised(true);
    }, [setAuthData]);

    useEffect(() => {
        initialiseData();
    }, [initialiseData]);

    const context = { isInitialised, user, isAuthenticated, hasRoles, isAdmin, setAuthData, resetAuthData };

    return <AuthContext.Provider value={context}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;