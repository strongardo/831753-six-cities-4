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
      reviews: [
        {
          text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum.`,
          starsCount: 4,
          url: `img/avatar-max.jpg`,
          name: `Max`,
          date: new Date(`2020-02-22`),
          id: 1,
        },
        {
          text: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
          totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
          sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`,
          starsCount: 3,
          url: `img/avatar-angelina.jpg`,
          name: `Kate`,
          date: new Date(`2020-05-22`),
          id: 2,
        },
      ],
    };
  });
};

export default adaptOffers;
