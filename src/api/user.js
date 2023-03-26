import { endPoints } from "../constants/endpoints";
import httpClient from "../utils/httpClient";

export function getCurrentUserService() {
    return httpClient.get(endPoints.ME, { setAuthHeader: true });
}