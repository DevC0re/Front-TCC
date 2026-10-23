import {api} from './api';

interface loginRequest{
    email:string;
    senha: string;
} 

export function login(data:loginRequest) {
    return api.post<string>("/login", data)
}