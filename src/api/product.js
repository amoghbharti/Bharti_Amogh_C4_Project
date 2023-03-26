import { endPoints } from "../constants/endpoints";
import httpClient from "../utils/httpClient";

export function getProductsService() {
    return httpClient.get(endPoints.PRODUCTS, { setAuthHeader: true });
}

export function getProductByIdService(id = '') {
    return httpClient.get(`${endPoints.PRODUCTS}/${id}`, { setAuthHeader: true });
}

export function getCategoriesService() {
    return httpClient.get(endPoints.CATEGORIES, { setAuthHeader: true });
}

export function addProductService(data = {}) {
    return httpClient.post(endPoints.PRODUCTS, data, { setAuthHeader: true });
}

export function updateProductService(id = '', data = {}) {
    return httpClient.put(`${endPoints.PRODUCTS}/${id}`, data, { setAuthHeader: true });
}

export function deleteProductService(id = '') {
    return httpClient.delete(`${endPoints.PRODUCTS}/${id}`, { setAuthHeader: true });
}