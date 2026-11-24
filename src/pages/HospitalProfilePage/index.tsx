import s from "./HospitalProfilePage.module.scss";
import { HospitalCard } from "../../components/HospitalCard";
import { useNavigate, useParams } from "react-router-dom";
import { Hospitals } from "../../data/Hospital";
import { Clock, Globe, Phone } from "lucide-react";
import { ComingSoon } from "../../components/ComingSoon";
import { Navbar } from "../../components/Navbar";
import { useEffect,useRef, useState } from "react";

import {
  addReview,
  type Review,
  getReviewByHospital,
} from "../../service/reviewService";

export function HospitalProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const chosenHospital = Hospitals.find(
    (hospital) => hospital.id === Number(id)
  );

  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const reviewSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chosenHospital) {
      setReviews([]);
      return;
    }

    setReviews(
      getReviewByHospital(chosenHospital.id)
    );
  }, [chosenHospital?.id]);

  function handleReviewSubmit() {
    if (!chosenHospital || rating === 0) return;

    const newReview: Review = {
      id: crypto.randomUUID(),
      hospitalId: chosenHospital.id,
      author:
        localStorage.getItem("userName") ?? "Usuário",
      rating,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    };

    // Persiste no localStorage
    addReview(newReview);

    // Atualiza a tela imediatamente
    setReviews((previous) => [
      ...previous,
      newReview,
    ]);

    // Limpa o formulário
    setRating(0);
    setComment("");
  }
  function handleGoToReview() {
  reviewSectionRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

  return (
    <>
      <ComingSoon
        isOpen={chosenHospital === undefined}
        onClose={() => navigate("/home")}
      />

      <div className={s.body}>
        <Navbar />

        <div className={s.main}>

          {chosenHospital && (
            <HospitalCard
            {...chosenHospital}
              variant="profile"
              waitingTime={chosenHospital.waitingTime}
              onReviewClick={handleGoToReview}
              />
          )}

          <div className={s.cardWrapper}>
            {chosenHospital && (
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
            )}

            {chosenHospital && (
              <div className={s.agreementBox}>
                <h1>Convênios aceitos</h1>

                {chosenHospital.agreements.map(
                  (agreement) => (
                    <p key={agreement}>
                      {agreement}
                    </p>
                  )
                )}
              </div>
            )}
          </div>

          {chosenHospital && (
            <div className={s.specialtyBox}>
              {chosenHospital.specialties.map(
                (specialty) => (
                  <p key={specialty}>
                    {specialty}
                  </p>
                )
              )}
            </div>
          )}

          {/* ÁREA DE AVALIAÇÃO */}
          {chosenHospital && (
            <div 
            ref={reviewSectionRef}
            className={s.reviewSection}>
              <div className={s.reviewForm}>
                <h1>Avaliar hospital</h1>

                <p className={s.reviewSubtitle}>
                  Como foi sua experiência neste hospital?
                </p>

                <div className={s.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                    key={star}
                      type="button"
                      className={s.starButton}
                      onClick={() => setRating(star)}
                    >
                      {star <= rating ? "★" : "☆"}
                    </button>
                  ))}
                </div>

                <textarea
                  className={s.reviewTextarea}
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  placeholder="Conte como foi sua experiência..."
                />

                <button
                  className={s.reviewSubmit}
                  type="button"
                  onClick={handleReviewSubmit}
                  disabled={rating === 0}
                >
                  Enviar avaliação
                </button>
              </div>

              <div className={s.reviewsList}>
                <h1>Avaliações</h1>

                {reviews.length === 0 ? (
                  <div className={s.emptyReviews}>
                    <p>Ainda não existem avaliações para este hospital.</p>
                    <span>Seja o primeiro a compartilhar sua experiência.</span>
                  </div>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review.id}
                      className={s.reviewCard}
                    >
                      <div className={s.reviewHeader}>
                        <div>
                          <strong>{review.author}</strong>

                          <div className={s.reviewStars}>
                            {"★".repeat(review.rating)}
                            {"☆".repeat(5 - review.rating)}
                          </div>
                        </div>

                        <small>
                          {new Date(
                            review.createdAt
                          ).toLocaleDateString("pt-BR")}
                        </small>
                      </div>

                      {review.comment && (
                        <p className={s.reviewComment}>
                          {review.comment}
                        </p>
                      )}
                    </div>
                  ))
                )}
                  </div>
            </div>
          )
        }
        </div>
        </div>
        </>
  )
}