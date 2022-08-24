import { useAppSelector } from '../../hooks';
import PlaceList from '../../components/placeList/placeList';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import CityList from '../../components/cityList/cityList';
import SortList from '../../components/sortList/sortList';
import { useState } from 'react';
import cities from '../../mocks/cities';
import FilterType from '../../mocks/filterTypes';
import { Location } from '../../types/offer';
import { State } from '../../types/state';

const citySelector = (state: State) => state.city;
const filterSelector = (state: State) => state.currentFilter;

const offersSelector = (state: State) => (
  state.offers.filter((offer) => offer.city.name === state.city.name)
    .sort((a, b) => {
      if (state.currentFilter === 'Price: low to high') {
        return a.price - b.price;
      }

      if (state.currentFilter === 'Price: high to low') {
        return b.price - a.price;
      }

      if (state.currentFilter === 'Top rated first') {
        return b.rating - a.rating;
      }
      return 0;
    })
);

function Main(): JSX.Element {
  const city = useAppSelector(citySelector);
  const filter = useAppSelector(filterSelector);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const offers = useAppSelector(offersSelector);

  const toggleFilter = () => {
    setIsOpenFilter(false);
  };

  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(undefined);

  const OfferPlaceHover = (hoveredOffer: number | null) => {
    if (hoveredOffer === null) {
      setSelectedLocation(undefined);
    } else {
      const currentOffer = offers.find((offer) => offer.id === hoveredOffer);
      setSelectedLocation(currentOffer?.location);
    }
  };

  const currentPoints = offers.map((offer) => offer.location);
  const zoom = 10;

  return (
    <section>
      <div style={{ display: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"
            >
            </path>
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path>
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
            >
            </path>
          </symbol>
        </svg>
      </div>

      <div className="page page--gray page--main">
        <Header />
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CityList cities={cities} />
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {offers.length} places to stay in {city.name}
                </b>
                <form className="places__sorting" action="#" method="get" onClick={() => {
                  setIsOpenFilter(!isOpenFilter);
                }}
                >
                  <span className="places__sorting-caption">
                    Sort by
                  </span>
                  <span className="places__sorting-type" tabIndex={0}>
                    {filter}
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <SortList isOpenFilter={isOpenFilter} currentFilter={filter} filterTypes={FilterType} toggleFilter={toggleFilter} />
                </form>
                <PlaceList offers={offers} OfferPlaceHover={OfferPlaceHover} />
              </section>
              <div className="cities__right-section">

                <Map
                  className="cities__map map"
                  zoom={zoom}
                  center={city.location}
                  points={currentPoints}
                  selectedLocation={selectedLocation}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default Main;
