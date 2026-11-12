import { Input } from "../../components/Input";
import s from "./Home.module.scss";
import { HospitalCard } from "../../components/HospitalCard";
import { Hospitals, nearbyHospitals } from "../../data/Hospital";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";


export function HomePage() {

    const userName = localStorage.getItem("userName")?.trim() || "Usuário";

    const [search, setSearch] = useState("")

    const filteredHospitals = Hospitals.filter((hospital) =>
        hospital.name.toLowerCase().includes(search.toLowerCase()))

    const navigate = useNavigate();

    return (
        <>
            <div className={s.body}>

               <Navbar/>
                <main className={s.main}>

                    <div className={s.searchBar}>
                        <Input className={s.searchInput}
                            type="text"
                            id="search"
                            placeholder="Busque Hospitais"
                            variant="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className={s.box}>
                        <div className={s.text}>

                            <h1>Bem vindo, {userName}</h1>
                            <p>Encontre os melhores serviços da sua região</p>

                        </div>

                        <div className={s.boxHighlight}>

                            <div className={s.carousel}>

                                {filteredHospitals.length > 0 ? (

                                    filteredHospitals.map((hospital => (
                                        <HospitalCard
                                        key={hospital.id}
                                        onOpen={() => navigate(`/hospital/${hospital.id}`)}
                                            image={hospital.image}
                                            name={hospital.name}
                                            address={hospital.address}
                                            status={hospital.status}
                                            rating={hospital.rating}
                                            type={hospital.type}
                                            favorite={hospital.favorite}
                                        />
                                    ))
                                    )
                                ) : (
                                    <p>Não encontramos hospitais para essa busca</p>
                                )}


                            </div>
                        </div>

                    </div>

                    <div className={s.box}>
                        <div className={s.text}>

                            <h1>Mais proximos á você </h1>
                            <p>Serviços de saúde pertinho de você</p>
                        </div>

                        <div className={s.boxNearby}>

                            <div className={s.carousel}>
                                {nearbyHospitals.map((hospital) => (
                                    <HospitalCard
                                        key={hospital.id}
                                        onOpen={() => navigate(`/hospital/${hospital.id}`)}
                                        image={hospital.image}
                                        name={hospital.name}
                                        address={hospital.address}
                                        status={hospital.status}
                                        rating={hospital.rating}
                                        type={hospital.type}
                                        favorite={hospital.favorite}
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