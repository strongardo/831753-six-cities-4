const adaptReviews = (serverReviews) => {
  return serverReviews.map((review) => {
    return {
      text: review.comment,
      starsCount: review.rating,
      url: review.user.avatar_url,
      name: review.user.name,
      date: review.date,
      id: review.id,
      isPro: review.user.is_pro,
    };
  });
};

export default adaptReviews;
