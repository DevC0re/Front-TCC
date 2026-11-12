import s from "./HospitalCard.module.scss";
import { Heart, MapPin, Star } from "lucide-react";
import { useState } from "react";

interface Data {
    onOpen?: () => void;
    image: string;
    name: string;
    address: string;
    status: boolean;
    rating: number;
    type: "SUS" | "Convênio";
    favorite: boolean;
    variant?: "default" | "profile";
    waitingTime?: string;
}
export function HospitalCard({ onOpen, waitingTime, image, name, address, status, rating, type, favorite, variant }: Data) {

    const [favoritoAtual, setFavoritoAtual] = useState(favorite);

    return (


        <div
            className={`${variant === "profile" ? s.profileCard : s.card} ${onOpen ? s.clickable : ""}`}
            onClick={onOpen}
            tabIndex={onOpen ? 0 : undefined}
            onKeyDown={onOpen ? (event) => {
                if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) {
                    event.preventDefault();
                    onOpen();
                }
            } : undefined}
        >

            <img src={image} alt="" className={s.img} />

            <div className={s.favorite}>

                <h1 className={s.favoriteText}>{name}</h1>
                <button type="button" aria-label={`Favoritar ${name}`} onClick={(event) => {
                    event.stopPropagation();
                    setFavoritoAtual(!favoritoAtual);
                }} className={s.favoriteIcon}>
                    <Heart fill={favoritoAtual ? "currentColor" : "none"} />
                </button>
            </div>

            <div className={s.route}>
                <MapPin className={s.mapPin} fill="red" />
                <p>{address}</p>
            </div>

            <div className={s.infos}>

                <div className={s.status}>
                    {status === true && <p>Aberto agora</p>}
                    {status === false && <p>Fechado</p>}
                </div>
                {variant === "profile" && (
                    <div className={s.waitingTime}>
                        <p>Espera</p>
                        <strong>{waitingTime}</strong>
                    </div>
                )}
                <div className={s.rating}>
                    <Star className={s.ratingStar} fill="currentColor" />
                    <p>{rating}</p>
                </div>

                <div className={s.type}>
                    <p>{type}</p>
                </div>

            </div>
            {variant === "profile" && (
                <div className={s.actions}>
                    <button>Ligar</button>
                    <button>Rota</button>
                    <button>Avaliar</button>
                </div>
            )}
        </div>
    )
}