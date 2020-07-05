import React from "react";
import renderer from "react-test-renderer";
import OffersList from "./offers-list.jsx";

const offers = [
  {
    name: `Beautiful & luxurious apartment at great location`,
    descriptions: [
      `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.
    The building is green and from 18th century.`,
      `An independent House, strategically located between Rembrand Square and National Opera,
    but where the bustle of the city comes to rest in this alley flowery and colorful.`,
    ],
    type: `Apartment`,
    owner: {
      url: `img/avatar-angelina.jpg`,
      name: `Angelina`,
      isSuper: true,
    },
    advantages: [
      `Wi-Fi`,
      `Heating`,
      `Kitchen`,
      `Fridge`,
      `Washing machine`,
      `Coffee machine`,
      `Dishwasher`,
      `Towels`,
      `Baby seat`,
      `Cabel TV`,
    ],
    price: 128,
    url: `img/apartment-01.jpg`,
    urls: [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
      `img/room.jpg`,
    ],
    starsCount: 3.7,
    bedroomsCount: 4,
    guestsCount: 8,
    isPremium: true,
    coordinates: [52.3909553943508, 4.85309666406198],
    reviews: [
      {
        text: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.
        The building is green and from 18th century.`,
        starsCount: 1,
        url: `img/avatar-max.jpg`,
        name: `Max`,
        date: new Date(`2017-12-12`),
        id: 1,
      },
    ],
    id: 2,
  },
];

it(`Should OffersList render correctly`, () => {
  const tree = renderer
    .create(<OffersList
      offers={offers}
      sortType={`Popular`}
      onCardTitleClick={() => {}}
      onCardHover={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
