// Token Management functions

export const getToken = () => {
    return localStorage.getItem('accessToken');
}

export const setToken = (accessToken) => {
    return localStorage.setItem('accessToken', accessToken);
}

export const removeToken = () => {
    return localStorage.removeItem('accessToken');
}