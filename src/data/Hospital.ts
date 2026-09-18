import campoLimpo from "../assets/hopital-municipal-do-campo-limpo-1024x683.jpg.webp"
import grajau from "../assets/Hospital-Grajau.jpg"
import regionalSul from"../assets/Regional-Sul.webp";
import santaCruz from "../assets/hospital-santa-cruz.webp";
import saoLuiz from "../assets/Hospital-Sao-Luiz-Campinas-768x506.webp";
import einstein from "../assets/gettyimages-459655244-612x612.jpg";

interface Hospital {
  image: string;
  name: string;
  adress: string;
  status:boolean;
  rating: number;
  type: "SUS" | "Convênio";
  favorite: boolean;
}

export const Hospitals: Hospital[] = [
  {
    image: grajau,
    name: "Hospital Geral do Grajaú",
    adress: "Rua Francisco Octavio Pacca",
    status:true,
    rating: 4.9,
    type: "SUS",
    favorite: false,
  },

  {
    image: campoLimpo,
    name: "Hospital Municipal do Campo Limpo",
    adress: "Estrada do Campo Limpo",
    status:false,
    rating: 4.7,
    type: "SUS",
    favorite: false,
  },

  {
    image: einstein,
    name: "Hospital Israelita Albert Einstein",
    adress: "Av. Albert Einstein",
    status:true,
    rating: 4.8,
    type: "Convênio",
    favorite: true,
  },
];
export const nearbyHospitals: Hospital[] = [
  {
    image: campoLimpo,
    name: "Hospital Municipal do Campo Limpo",
    adress: "Estrada do Campo Limpo",
    status: true,
    rating: 4.6,
    type: "SUS",
    favorite: false,
  },

  {
    image: regionalSul ,
    name: "Hospital Regional Sul",
    adress: "Rua General Roberto Alves",
    status: true,
    rating: 4.5,
    type: "SUS",
    favorite: false,
  },

  {
    image: santaCruz,
    name: "Hospital Santa Cruz",
    adress: "Rua Olegário Maciel",
    status: false,
    rating: 4.7,
    type: "Convênio",
    favorite: true,
  },

];