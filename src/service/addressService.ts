import { api } from "./api";


export interface AddressRequest {
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  apelido?: string | null;
  principal?: boolean;
}

export interface AddressResponse extends AddressRequest {
  id: string;
  principal: boolean;
}

export function getAddresses() {
  return api.get<AddressResponse[]>(
    "/usuario/me/enderecos"
  );
}

export function createAddress(data: AddressRequest) {
  return api.post<AddressResponse>(
    "/usuario/me/enderecos",
    data
  );
}

export function updateAddress(
  id: string,
  data: AddressRequest
) {
  return api.put<AddressResponse>(
    `/usuario/me/enderecos/${id}`,
    data
  );
}

export function deleteAddress(id: string) {
  return api.delete<void>(
    `/usuario/me/enderecos/${id}`
  );
}


export function setPrimaryAddress(id: string) {
  return api.patch<AddressResponse>(
    `/usuario/me/enderecos/${id}/principal`
  );
}