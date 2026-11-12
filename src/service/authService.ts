import {api} from './api';

interface loginRequest{
    email:string;
    senha: string;
} 

interface LoginResponse {
    token: string;
    name: string;
}

export function login(data:loginRequest) {
    return api.post<LoginResponse>("/login", data)
}