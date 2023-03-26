import { Navigate } from 'react-router-dom';
import AppLayout from '../common/layout/AppLayout';
import ErrorPage from '../components/error/ErrorPage';
import Login from '../components/login/Login';
import Signup from '../components/signup/Signup';
import Products from '../components/products/Products';
import AddProduct from '../components/products/AddProduct';
import { roles } from '../constants/roles';

// Application routes definition
const routes = (isAuthenticated, hasRoles = []) => {
    
    // function to check if user is allowed to visit the route or not
    const authRouteGaurd = (element, allowedRoles = []) => {
        // if no restrictions return the element directly
        if (!isAuthenticated) {
            return <Navigate to="/" />;
        }
        if (allowedRoles.length === 0) {
            return element;
        }
        const isAllowed = allowedRoles.find((role) => hasRoles.find((userRole) => userRole.name === role));
        return isAllowed ? element : <Navigate to="/" />;
    }

    // function for non auth routes if user already signed in
    const nonAuthRouteSignedIn = (element) => {
        return isAuthenticated ? <Navigate to='/' /> : element;
    }

    return [
        {
            path: "/",
            element: <AppLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "",
                    element: isAuthenticated ? <Navigate to='/products' /> : <Navigate to="/login" />
                },
                {
                    path: "login",
                    element: nonAuthRouteSignedIn(<Login />)
                },
                {
                    path: "signup",
                    element: nonAuthRouteSignedIn(<Signup />)
                },
                {
                    path: "products",
                    element: authRouteGaurd(<Products />)
                },
                {
                    path: "add-product",
                    element: authRouteGaurd(<AddProduct />, [roles.ADMIN])
                },
                {
                    path: "modify-product/:id",
                    element: authRouteGaurd(<AddProduct modify={true} />, [roles.ADMIN])
                }
            ]
        }
    ]
};

export default routes;