import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeOffers, sortLowPrice, sortHighPrice, sortRate } from '../../store/action';
import PlaceList from '../../components/placeList/placeList';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import { City } from '../../types/city';
import { Offer } from '../../types/offer';
import CityList from '../../components/cityList/cityList';
import { useState, useEffect } from 'react';
import cities from '../../mocks/cities';
import FilterType from '../../mocks/filterTypes';

type MainProps = {
  offers: Offer[],
}

function Main({offers}: MainProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [currentCity, setCurrentCity] = useState(
    useAppSelector((state) => state.city)
  );
  const [currentCityOffers, setCurrentCityOffers] = useState(
    useAppSelector((state) => state.offers).filter(
      (offer) => offer.city === currentCity.name
    )
  );
  const [currentPoints, setCurrentPoints] = useState(
    currentCityOffers.map((offer) => offer.location)
  );
  const [currentFilter, setCurrentFilter] = useState(FilterType[0]);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const onChangeTab = (city: City) => {
    setCurrentCity(city);
    dispatch(changeOffers(offers));
    setCurrentCityOffers(offers.filter((item) => item.city === city.name));
  };

  useEffect(() => {
    if (isOpenFilter) {
      if (currentFilter === FilterType[1]) {
        dispatch(sortLowPrice());
      } else if (currentFilter === FilterType[2]) {
        dispatch(sortHighPrice());
      } else if (currentFilter === FilterType[3]) {
        dispatch(sortRate());
      }
    }
    setCurrentPoints(currentCityOffers.map((offer) => offer.location));
  }, [currentCityOffers]);

  const width = '512px';
  const height = '849px';
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
              <CityList cities={cities} onChangeTab={onChangeTab} />
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {currentCityOffers.length} places to stay in {currentCity.name}
                </b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul
                    className={cn('places__options places__options--custom', {
                      'places__options--opened': isOpenFilter,
                    })}
                  >
                    {FilterType.map((filterType) => (
                      <li
                        key={filterType}
                        className={cn('places__option', {
                          'places__option--active':
                            currentFilter === filterType,
                        })}
                        tabIndex={0}
                        onClick={() => {
                          setCurrentFilter(filterType);
                          // eslint-disable-next-line no-console
                          console.log(currentFilter);
                          setIsOpenFilter(false);
                        }}
                      >
                        {filterType}
                      </li>
                    ))}
                  </ul>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li
                      className="places__option places__option--active"
                      tabIndex={0}
                    >
                      Popular
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Price: low to high
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Price: high to low
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Top rated first
                    </li>
                  </ul>
                </form>
                <PlaceList offers={currentCityOffers} />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map
                    zoom={zoom}
                    center={currentCity.location}
                    points={currentPoints}
                    width={width}
                    height={height}
                  />
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default Main;
