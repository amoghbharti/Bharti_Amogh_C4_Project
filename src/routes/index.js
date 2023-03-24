import AppLayout from '../common/layout/AppLayout';
import ErrorPage from '../components/error/ErrorPage';

const routes = (isAuthenticated, hasRole) => {
    return [
        {
            path: "/",
            element: <AppLayout />,
            errorElement: <ErrorPage />,
            children: [
            ]
        }
    ]
};

export default routes;