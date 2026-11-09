import s from "./HospitalProfilePage.module.scss";
import { HospitalCard } from "../../components/HospitalCard";
import { Hospitals } from "../../data/Hospital";
import { Clock, Globe, Phone } from "lucide-react";

export function HospitalProfilePage() {
  const chosenHospital = Hospitals.find((Hospital) => Hospital.id === 1);

  console.log(chosenHospital);
  return (
    <div className={s.body}>
      <div className={s.main}>
        

        <div className={s.cardWrapper}>
            
          <div className={s.informationsBox}>
            <h1>Informações</h1>
            <Clock/> <h2>Horário:</h2> <p>Atendimento 24 horas</p>
            <Phone/> <h2>Telefone:</h2> <p>(11) 2151-1233</p>
            <Globe/> <h2>Site:</h2> <p>https://www.einstein.br/n</p>
          </div>

          <div className={s.agreementBox}></div>
        </div>

        <div className={s.specialtyBox}></div>
      </div>
    </div>
  );
}
