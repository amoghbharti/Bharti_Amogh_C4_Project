import { roles } from '../../constants/roles';

export const nonAuthTabs = [
    {
        path: '/login',
        label: 'Login',
    },
    {
        path: '/signup',
        label: 'Sign Up',
    }
];

export const authTabs = [
    {
        path: '/products',
        label: 'Home',
        allowedRoles: [roles.ADMIN, roles.USER],
    },
    {
        path: '/add-product',
        label: 'Add Product',
        allowedRoles: [roles.ADMIN],
    }
];
