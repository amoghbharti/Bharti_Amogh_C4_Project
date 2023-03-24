import { roles } from '../../constants/roles';

export const nonAuthTabs = [
    {
        path: 'login',
        label: 'Login',
    },
    {
        path: 'signup',
        label: 'Sign Up',
    }
];

export const authTabs = [
    {
        path: '',
        label: 'Home',
        allowedRoles: [roles.ADMIN, roles.USER],
    },
    {
        path: 'products',
        label: 'Add Product',
        allowedRoles: [roles.ADMIN],
    }
];
