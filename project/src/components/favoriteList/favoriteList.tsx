import { Offer } from '../../types/offer';
import { useState } from 'react';
import Favorite from '../favorite/favorite';

type FavoriteListProps = {
  favoriteOffers: Offer[],
}

function FavoriteList({favoriteOffers}: FavoriteListProps): JSX.Element {
  // eslint-disable-next-line
  const [activeOffer, setActiveOffer] = useState({});

  return (
    <div className="favorites__places">
      {favoriteOffers.map((item) => <Favorite key={item.id} img={item.img} type={item.type} price={item.price} name={item.name} isPremium={item.isPremium} active={item.active} rating={item.rating} id={item.id} setActiveOffer={() => setActiveOffer(item)} />)}
    </div>
  );
}

export default FavoriteList;
