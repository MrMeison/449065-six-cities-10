import Place from '../place/place';
import { Offer } from '../../types/offer';

type PlaceListProps = {
  offers: Offer[];
}

function PlaceList({offers}: PlaceListProps): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((item) => (
        <Place key={item.id} {...item} />
      ))}
    </div>
  );
}

export default PlaceList;
