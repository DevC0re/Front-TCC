import { Input } from "../../components/Input";
import s from "./Home.module.scss";
import { HospitalCard } from "../../components/HospitalCard";
import { Hospitals, nearbyHospitals } from "../../data/Hospital";

export function HomePage() {

    return (
        <>
            <div className={s.content}>

                <aside className={s.asSide}>
                    <img src="" alt="Logo" />

                    <div className={s.navLinks}>
                        <img src="" alt="Logo" />
                        <img src="" alt="Logo" />
                        <img src="" alt="Logo" />

                    </div>

                </aside>

                <main className={s.main}>

                    <div className={s.searchBar}>
                        <Input className={s.searchInput}
                            type="text"
                            id="search"
                            placeholder="Busque Hospitais"
                            variant="search"
                        />
                    </div>

                    <div className={s.box}>
                        <div className={s.text}>

                            <h1>Bem vindo</h1>
                            <p>Encontre os melhores serviços da sua região</p>

                        </div>

                        <div className={s.boxDestaque}>

                            <div className={s.carousel}>

                                {Hospitals.map((hospital) => (
                                    <HospitalCard
                                        image={hospital.image}
                                        name={hospital.name}
                                        endereco={hospital.adress}
                                        situacao={hospital.status}
                                        avaliacao={hospital.rating}
                                        type={hospital.type}
                                        favorito={hospital.favorite}
                                    />
                                ))}



                            </div>
                        </div>

                    </div>

                    <div className={s.box}>
                        <div className={s.text}>

                            <h1>Mais proximos á você </h1>
                            <p>Serviços de saúde pertinho de você</p>
                        </div>

                        <div className={s.boxProximos}>

                            <div className={s.carousel}>
                                {nearbyHospitals.map((hospital) => (
                                    <HospitalCard
                                        image={hospital.image}
                                        name={hospital.name}
                                        endereco={hospital.adress}
                                        situacao={hospital.status}
                                        avaliacao={hospital.rating}
                                        type={hospital.type}
                                        favorito={hospital.favorite}
                                    />
                                ))}



                            </div>
                        </div>
                    </div>


                </main>
            </div>
        </>
    )

}