import { Navigate } from 'react-router-dom';
import AppLayout from '../common/layout/AppLayout';
import ErrorPage from '../components/error/ErrorPage';
import Login from '../components/login/Login';
import Signup from '../components/signup/Signup';
import Products from '../components/products/Products';

// Application routes definition
const routes = (isAuthenticated, hasRoles = [], onAuthFailed = () => {}) => {
    // function to check if user is allowed to visit the route or not
    const routeGaurd = (element, allowedRoles = []) => {
        // if no restrictions return the element directly
        if (!isAuthenticated) {
            onAuthFailed();
            return <Navigate to="/" />;
        }
        if (allowedRoles.length === 0) {
            return element;
        }
        const isAllowed = allowedRoles.find((role) => hasRoles.find((userRole) => userRole.name === role));
        return isAllowed ? element : <Navigate to="/" />;
    }

    return [
        {
            path: "/",
            element: <AppLayout />,
            errorElement: <ErrorPage />,
            children: [
                ...(!isAuthenticated ? [
                    {
                        path: "",
                        element: <Navigate to="/login" />
                    },
                    {
                        path: "login",
                        element: <Login />
                    },
                    {
                        path: "signup",
                        element: <Signup />
                    },
                ] : [
                    {
                        path: "",
                        element: <Navigate to="/products" />
                    },
                    {
                        path: "products",
                        element: routeGaurd(<Products />)
                    },
                ])
            ]
        }
    ]
};

export default routes;