import httpClient from "../utils/httpClient";
import { endPoints } from "../constants/endpoints";

export async function signupService(body = {}) {
    return httpClient.post(endPoints.SIGNUP, body);
}

export async function loginService(body = {}) {
    return httpClient.post(endPoints.LOGIN, body);
}