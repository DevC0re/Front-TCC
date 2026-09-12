import s   from "./HospitalCard.module.scss";
import { Heart, MapPin, Star } from "lucide-react";

interface Data {
    image: string;
    name: string;
    endereco: string;
    situacao: boolean;
    avaliacao: number;
    type: "SUS" | "Convênio";
    favorito: boolean;
}
export function HospitalCard({ image, name, endereco, situacao, avaliacao, type, favorito }: Data) {
    return (
        
        <div>

            <img src={image} alt="" className={s.img}/>

            <div className={s.favorite}>

                <h1 className={s.favoriteText}>{name}</h1>
                <button className={s.favoriteIcon}>
                    <Heart/>
                    </button>
            </div>

            <div className={s.route}>
                <MapPin className={s.mapPin}/>
                <p>{endereco}</p>
            </div>

            <div className={s.infos}>

                <div className={s.situacao}>
                 {situacao === true && <p>Aberto agora</p>}
                </div>

                <div className={s.avaliacao}>
                    <Star className={s.avaliacaoStar}/>
                    <p>{avaliacao}</p>
                </div>

                <div className={s.type}>
                    <p>{type}</p>
                </div>

            </div>
        </div>
    )
}