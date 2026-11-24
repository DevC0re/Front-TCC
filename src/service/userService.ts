import { api } from "./api";

export interface Convenio {
  id: string;
  name: string;
  cnpj: string;
  hospitaisAceitos: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  photo?: string;
  convenio?: Convenio | null;
}

export interface UpdateUserProfile {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
  cpf?: string;
  password: string;
}
export interface UserAdress{
  road: string;
  neighborhood: string;
  cep: string;
  number: number;
  state: string;

}

export function createUser(data: CreateUserRequest) {
  return api.post("/usuario", data);
}

export function getCurrentUser() {
  return api.get<UserProfile>("/usuario/me");
}

export function updateCurrentUser(data: UpdateUserProfile) {
  return api.put<UserProfile>("/usuario/me", data);
}

export function getConvenios() {
  return api.get<Convenio[]>("/convenio");
}

export function updateCurrentUserConvenio(convenioId: string) {
  return api.put<UserProfile>(
    `/usuario/me/convenio/${convenioId}`
  );
}

export function getCurrentAdress(){

  return api.get<UserAdress>(`/usuario/me/enderecos`)
}