import campoLimpo from "../assets/hopital-municipal-do-campo-limpo-1024x683.jpg.webp";
import grajau from "../assets/Hospital-Grajau.jpg";
import regionalSul from "../assets/Regional-Sul.webp";
import santaCruz from "../assets/hospital-santa-cruz.webp";
import einstein from "../assets/gettyimages-459655244-612x612.jpg";

export interface Hospital {
  id: number;
  image: string;
  name: string;
  address: string;
  status: boolean;
  rating: number;
  type: "SUS" | "Convênio";
  favorite: boolean;

  phone: string;
  site: string;
  openingHours: string;
  waitingTime: string;

  agreements: string[];
  specialties: string[];
}

export const Hospitals: Hospital[] = [
  {
    id: 1,
    image: grajau,
    name: "Hospital Geral do Grajaú",
    address: "Rua Francisco Octávio Pacca, 180 - Parque das Nações",
    status: true,
    rating: 4.9,
    type: "SUS",
    favorite: false,

    phone: "(11) 3544-9444",
    site: "https://irssl.org.br/unidades_e_servicos/hospital-geral-do-grajau/",
    openingHours: "Atendimento 24 horas",
    waitingTime: "35 min",

    agreements: [
      "SUS",
    ],

    specialties: [
      "Cardiologia",
      "Ortopedia",
      "Pediatria",
      "Clínica Geral",
      "Neurologia",
      "Ginecologia",
      "Obstetrícia",
      "Cirurgia Geral",
    ],
  },

  {
    id: 2,
    image: campoLimpo,
    name: "Hospital Municipal do Campo Limpo",
    address: "Estrada de Itapecerica, 1661 - Vila Maracanã",
    status: false,
    rating: 4.7,
    type: "SUS",
    favorite: false,

    phone: "(11) 5178-2450",
    site: "https://prefeitura.sp.gov.br/web/saude/w/hospital-municipal-do-campo-limpo",
    openingHours: "Atendimento 24 horas",
    waitingTime: "50 min",

    agreements: [
      "SUS",
    ],

    specialties: [
      "Neurocirurgia",
      "Ortopedia",
      "Traumatologia",
      "Obstetrícia",
      "Psiquiatria",
      "Clínica Médica",
      "Pediatria",
    ],
  },

  {
    id: 3,
    image: einstein,
    name: "Hospital Israelita Albert Einstein",
    address: "Av. Albert Einstein, 627/701 - Morumbi",
    status: true,
    rating: 4.8,
    type: "Convênio",
    favorite: true,

    phone: "(11) 2151-1233",
    site: "https://www.einstein.br/n/unidades/einstein-morumbi",
    openingHours: "Pronto atendimento 24 horas",
    waitingTime: "25 min",

    agreements: [
      "Amil",
      "Bradesco Saúde",
      "SulAmérica",
    ],

    specialties: [
      "Clínica Médica",
      "Pediatria",
      "Ortopedia",
      "Cardiologia",
      "Neurologia",
      "Oncologia",
      "Gastroenterologia",
    ],
  },

  {
    id: 4,
    image: regionalSul,
    name: "Hospital Regional Sul",
    address: "Rua General Roberto Alves de Carvalho Filho, 270",
    status: true,
    rating: 4.5,
    type: "SUS",
    favorite: false,

    phone: "(11) 5694-8259",
    site: "",
    openingHours: "Atendimento 24 horas",
    waitingTime: "45 min",

    agreements: [
      "SUS",
    ],

    specialties: [
      "Clínica Geral",
      "Ortopedia",
      "Traumatologia",
      "Pediatria",
      "Cirurgia Geral",
      "Obstetrícia",
      "Neurocirurgia",
      "Cardiologia",
    ],
  },

  {
    id: 5,
    image: santaCruz,
    name: "Hospital Japonês Santa Cruz",
    address: "Rua Santa Cruz, 398 - Vila Mariana",
    status: true,
    rating: 4.7,
    type: "Convênio",
    favorite: true,

    phone: "(11) 5080-2000",
    site: "https://hjsc.com.br/",
    openingHours: "Pronto atendimento 24 horas",
    waitingTime: "20 min",

    agreements: [
      "Amil",
      "Bradesco Saúde",
      "Care Plus",
      "CNU",
      "Omint",
      "Prevent Senior",
      "Porto Seguro",
    ],

    specialties: [
      "Cardiologia",
      "Ortopedia",
      "Clínica Médica",
      "Urologia",
      "Nefrologia",
      "Dermatologia",
      "Cirurgia Vascular",
    ],
  },
];
export const nearbyHospitals = Hospitals.filter((hospital) =>
  [2, 4, 5].includes(hospital.id)
);