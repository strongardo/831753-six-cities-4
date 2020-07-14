const adaptOffers = (serverOffers) => {
  return serverOffers.map((offer) => {
    return {
      name: offer.title,
      descriptions: [offer.description],
      type: offer.type,
      owner: {
        url: offer.host.avatar_url,
        name: offer.host.name,
        isSuper: offer.host.is_pro,
      },
      advantages: offer.goods,
      price: offer.price,
      url: offer.preview_image,
      urls: offer.images,
      starsCount: offer.rating,
      bedroomsCount: offer.bedrooms,
      guestsCount: offer.max_adults,
      isPremium: offer.is_premium,
      coordinates: [offer.location.latitude, offer.location.longitude],
      city: {
        name: offer.city.name,
        coordinates: [offer.city.location.latitude, offer.city.location.longitude],
        zoom: offer.city.location.zoom,
        id: offer.city.name,
      },
      id: offer.id,
    };
  });
};

export default adaptOffers;
