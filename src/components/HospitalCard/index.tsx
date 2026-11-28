import s from "./HospitalCard.module.scss";
import { Heart, MapPin, Star, Phone } from "lucide-react";
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
  variant?: "default" | "profile" | "convenio";
  waitingTime?: string;
  onReviewClick?: () => void;
  phone?: string;
  onRouteClick?: () => void;
}
export function HospitalCard({
  onReviewClick,
  onOpen,
  waitingTime,
  image,
  name,
  address,
  status,
  rating,
  type,
  favorite,
  variant,
  phone,
  onRouteClick,
}: Data) {
  const [favoritoAtual, setFavoritoAtual] = useState(favorite);

  if (variant === "convenio") {
    return (
      <article className={s.convenioCard}>
        <img src={image} alt={name} className={s.convenioImage} />

        <div className={s.convenioContent}>
          <h2>
            {onOpen ? (
              <button
                type="button"
                className={s.convenioTitle}
                onClick={onOpen}
              >
                {name}
              </button>
            ) : (
              name
            )}
          </h2>

          <div className={s.convenioActions}>
            <div className={s.rating}>
              <Star className={s.ratingStar} fill="currentColor" />
              <p>{rating}</p>
            </div>

            <button
              type="button"
              className={s.callButton}
              disabled={!phone}
              onClick={() => {
                if (phone) {
                  window.location.href = `tel:${phone.replace(/\D/g, "")}`;
                }
              }}
            >
              <Phone size={18} />
              Ligar
            </button>

            <button
              type="button"
              disabled={!onRouteClick}
              onClick={onRouteClick}
            >
              <MapPin size={18} />
              Rota
            </button>

            <button
              type="button"
              disabled={!onReviewClick}
              onClick={onReviewClick}
            >
              <Star size={18} />
              Avaliar
            </button>

            <div className={`${s.status} ${!status ? s.closed : ""}`}>
              <p>{status ? "Aberto agora" : "Fechado"}</p>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <div
      className={`${variant === "profile" ? s.profileCard : s.card} ${onOpen ? s.clickable : ""}`}
      onClick={onOpen}
      tabIndex={onOpen ? 0 : undefined}
      onKeyDown={
        onOpen
          ? (event) => {
              if (
                event.target === event.currentTarget &&
                (event.key === "Enter" || event.key === " ")
              ) {
                event.preventDefault();
                onOpen();
              }
            }
          : undefined
      }
    >
      <img src={image} alt="" className={s.img} />

      <div className={s.favorite}>
        <h1 className={s.favoriteText}>{name}</h1>
        <button
          type="button"
          aria-label={`Favoritar ${name}`}
          onClick={(event) => {
            event.stopPropagation();
            setFavoritoAtual(!favoritoAtual);
          }}
          className={s.favoriteIcon}
        >
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
          <button type="button" onClick={onReviewClick}>
            Avaliar
          </button>
        </div>
      )}
    </div>
  );
}
