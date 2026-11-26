import axios from "axios";

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean | string;
}
export interface Coordinates {
  latitude: number;
  longitude: number;
}

interface BrasilApiResponse {
  location?: {
    coordinates?: {
      latitude?: string | number;
      longitude?: string | number;
    };
  };
}
export async function searchAddressByCep(cep: string) {
  const cleanCep = cep.replace(/\D/g, "");

  if (cleanCep.length !== 8) {
    throw new Error("CEP inválido.");
  }

  const response = await axios.get<ViaCepResponse>(
    `https://viacep.com.br/ws/${cleanCep}/json/`,
    { timeout: 8000 }
  );

  if (response.data.erro === true ||
      response.data.erro === "true") {
    throw new Error("CEP não encontrado.");
  }

  return {
    cep: response.data.cep,
    logradouro: response.data.logradouro,
    bairro: response.data.bairro,
    cidade: response.data.localidade,
    estado: response.data.uf,
  };
}
export async function searchCoordinatesByCep(
  cep: string
): Promise<Coordinates | null> {
  const cleanCep = cep.replace(/\D/g, "");

  if (cleanCep.length !== 8) {
    throw new Error("CEP inválido.");
  }

  const response = await axios.get<BrasilApiResponse>(
    `https://brasilapi.com.br/api/cep/v2/${cleanCep}`,
    { timeout: 8000 }
  );

  const coordinates = response.data.location?.coordinates;

  if (
    coordinates?.latitude == null ||
    coordinates?.longitude == null ||
    String(coordinates.latitude).trim() === "" ||
    String(coordinates.longitude).trim() === ""
  ) {
    return null;
  }

  const latitude = Number(coordinates.latitude);
  const longitude = Number(coordinates.longitude);

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    Math.abs(latitude) > 90 ||
    Math.abs(longitude) > 180
  ) {
    return null;
  }

  return {
    latitude,
    longitude,
  };
}
