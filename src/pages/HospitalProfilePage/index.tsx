import s from "./HospitalProfilePage.module.scss";
import { HospitalCard } from "../../components/HospitalCard";
import { useNavigate, useParams } from "react-router-dom";
import { Hospitals } from "../../data/Hospital";
import { Clock, Globe, Phone } from "lucide-react";
import { ComingSoon } from "../../components/ComingSoon";
import { Navbar } from "../../components/Navbar";

export function HospitalProfilePage() {
  const { id } = useParams();
  const chosenHospital = Hospitals.find((hospital) => hospital.id === Number(id));


  const navigate = useNavigate()


  return (
    <>
      <ComingSoon
        isOpen={chosenHospital === undefined}
        onClose={() => navigate("/home")}
      />
      <div className={s.body}>
        <Navbar/>

        <div className={s.main}>

          {chosenHospital && (<HospitalCard {...chosenHospital}
          variant="profile"
          waitingTime={chosenHospital.waitingTime}
          />
          )
          }


          <div className={s.cardWrapper}>


            {chosenHospital &&
              (
                <div className={s.informationsBox}>
                  <h1>Informações</h1>

                  <Clock />
                  <h2>Horário:</h2>
                  <p>{chosenHospital.openingHours}</p>

                  <Phone />
                  <h2>Telefone:</h2>
                  <p>{chosenHospital.phone}</p>
                  <Globe />
                  <h2>Site:</h2>
                  <p>{chosenHospital.site}</p>
                </div>

              )

            }

            {chosenHospital && (
              <div className={s.agreementBox}>
                <h1>Convênios aceitos</h1>
                {chosenHospital.agreements.map((agreement) => (
                  <p key={agreement}>{agreement} </p>
                ))}

              </div>

            )}
          </div>
          {chosenHospital && (

            <div className={s.specialtyBox}>

              {chosenHospital.specialties.map((specialty) => (
                <p key={specialty}>{specialty}</p>
              ))}

            </div>
          )}
        </div>
      </div>
    </>
  );
}
