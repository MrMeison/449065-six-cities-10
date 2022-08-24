import Place from '../place/place';
import { Offer } from '../../types/offer';
import { useState } from 'react';

type PlaceListProps = {
  offers: Offer[],
  OfferPlaceHover: (id: number | null) => void,
}

function PlaceList({offers, OfferPlaceHover}: PlaceListProps): JSX.Element {
  // eslint-disable-next-line
  const [activeOffer, setActiveOffer] = useState({});

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((item, index) => (
        <Place key={item.id} {...item}
          setActiveOffer={() => {
            setActiveOffer(item);
            OfferPlaceHover(item.id);
          }}
        />
      ))}
    </div>
  );
}

export default PlaceList;
