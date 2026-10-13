import { api } from "./api";

interface userRequest {
    name: string;
    email: string;
    password: string;
}
interface userResponse {
    name: string;
    email: string;
}


export function createUser(data: userRequest) {
    return api.post("/usuario", data);
}
export function getUser() {
    return api.get<userResponse>("/usuario");
}

export function getUserById(id: string) {
    return api.get<userResponse>(`/usuario/${id}`);
}

export function updateUser(id: string, data: userRequest) {
    return api.put<userResponse>(`/usuario/${id}`, data);
}

export function deleteUser(id: string) {
    return api.delete<string>(`/usuarios/${id}`);
}
