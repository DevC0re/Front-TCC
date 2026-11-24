const STORAGE_KEY = "medup_reviews"

export interface Review {
  id: string;
  hospitalId: number;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export function getReviews ():Review[]{
    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data):[]
}

export function getReviewByHospital(hospitalId: number){

    return getReviews().filter(
        (review)=> review.hospitalId === hospitalId);
}

export function addReview(review : Review){

     const reviews = getReviews();

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...reviews, review])
    )
}