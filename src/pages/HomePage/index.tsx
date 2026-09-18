import { Input } from "../../components/Input";
import s from "./Home.module.scss";
import { HospitalCard } from "../../components/HospitalCard";
import { Hospitals, nearbyHospitals } from "../../data/Hospital";
import logo from "../../assets/Logo.png";
import { Heart, House, User } from "lucide-react";
import { useState } from "react";
import { ComingSoon } from "../../components/ComingSoon";

export function HomePage() {

    const [search, setSearch] = useState("")

    const filteredHospitals = Hospitals.filter((hospital) =>
        hospital.name.toLowerCase().includes(search.toLowerCase()))

    const [isModalOpen , setIsModalOpen] = useState(false);

    return (
        <>
                <ComingSoon
                isOpen={isModalOpen}
                onClose={()=> setIsModalOpen(false)}
                />
            <div className={s.content}>

                <aside className={s.asSide}>
                    <img src={logo} alt="Logo" />

                    <div className={s.navLinks}>
                        <button 
                        className={s.navIcon}
                        onClick={()=>window.scrollTo({
                            top: 0,
                            behavior :"smooth"
                        })}
                        >
                            <House />
                        </button>
                        <button className={s.navIcon}
                        onClick={()=>setIsModalOpen(true)}
                        >
                            <User />
                        </button>

                        <button 
                        className={s.navIcon}
                        onClick={()=>setIsModalOpen(true)}
                        >

                            <Heart />

                        </button>

                    </div>

                </aside>

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

                            <h1>Bem vindo, Nome</h1>
                            <p>Encontre os melhores serviços da sua região</p>

                        </div>

                        <div className={s.boxHighlight}>

                            <div className={s.carousel}>

                                {filteredHospitals.length > 0 ? (

                                    filteredHospitals.map((hospital => (
                                        <HospitalCard
                                            image={hospital.image}
                                            name={hospital.name}
                                            adress={hospital.adress}
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
                                        image={hospital.image}
                                        name={hospital.name}
                                        adress={hospital.adress}
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