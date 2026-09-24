import s   from "./HospitalCard.module.scss";
import { Heart, MapPin, Star } from "lucide-react";
import { useState } from "react";

interface Data {
    image: string;
    name: string;
    adress: string;
    status: boolean;
    rating: number;
    type: "SUS" | "Convênio";
    favorite: boolean;
}
export function HospitalCard({ image, name, adress, status, rating, type, favorite }: Data) {
    
    const [favoritoAtual, setFavoritoAtual] = useState(favorite);

    return (
        

        <div className={s.card}>

            <img src={image} alt="" className={s.img}/>

            <div className={s.favorite}>

                <h1 className={s.favoriteText}>{name}</h1>
                <button onClick ={()=> setFavoritoAtual(!favoritoAtual)} className={s.favoriteIcon}>
                    <Heart fill={favoritoAtual? "currentColor": "none"}/>
                    </button>
            </div>

            <div className={s.route}>
                <MapPin className={s.mapPin} fill="red"/>
                <p>{adress}</p>
            </div>

            <div className={s.infos}>

                <div className={s.status}>
                 {status === true && <p>Aberto agora</p>}
                 {status === false && <p>Fechado</p>}
                </div>

                <div className={s.rating}>
                    <Star className={s.ratingStar} fill="currentColor"/>
                    <p>{rating}</p>
                </div>

                <div className={s.type}>
                    <p>{type}</p>
                </div>

            </div>
        </div>
    )
}