import s from "./AgreementsPage.module.scss";
import { HospitalCard } from "../../components/HospitalCard";
import { Hospitals } from "../../data/Hospital";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export function AgreementsPage() {
  const navigate = useNavigate();
  const { name } = useParams();

  const convenioName = name ?? "";

  const acceptedHospitals = Hospitals.filter(
    (hospital) =>
      hospital.type === "Convênio" &&
      hospital.agreements.some(
        (agreement) =>
          agreement.toLowerCase().trim() ===
          convenioName.toLowerCase().trim()
      )
  );


  return (
    <div className={s.body}>
      <main className={s.main}>
        <section className={s.convenioInfo}>
          <div className={s.header}>
            <button
              type="button"
              onClick={() => navigate("/profile")}
              aria-label="Voltar ao perfil"
            >
              <ChevronLeft />
            </button>

            <h1>Perfil do Convênio</h1>
          </div>

          <div className={s.convenioLogo}>
            <h2>{convenioName || "Convênio"}</h2>
          </div>
        </section>

        <section className={s.hospitalsSection}>
          <div className={s.sectionHeader}>
            <div>
              <h2>Hospitais credenciados</h2>

              <p>
                Consulte a cobertura específica do
                seu plano antes do atendimento.
              </p>
            </div>

            <span className={s.hospitalCount}>
              {acceptedHospitals.length}
              {" "}
              {acceptedHospitals.length === 1
                ? "hospital"
                : "hospitais"}
            </span>
          </div>

          <p className={s.notice}>
            Dados demonstrativos. Cobertura e status
            de atendimento ainda não verificados.
          </p>

          <div className={s.hospitalList}>
            {acceptedHospitals.length > 0 ? (
              acceptedHospitals.map((hospital) => (
                <HospitalCard
                  key={hospital.id}
                  {...hospital}
                  phone={undefined}
                  variant="convenio"
                  onOpen={() =>
                    navigate(`/hospital/${hospital.id}`)
                  }
                />
              ))
            ) : (
              <div className={s.emptyHospitals}>
                <p>
                  Nenhum hospital encontrado
                  nos dados disponíveis.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}