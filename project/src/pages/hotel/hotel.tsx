import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import FormComment from '../../components/formComment/formComment';
import Header from '../../components/header/header';
import PlaceList from '../../components/placeList/placeList';
import ReviewList from '../../components/reviewList/reviewList';
import Map from '../../components/map/map';
import { Offer } from '../../types/offer';
import { ReviewType } from '../../types/reviewType';
import { Location } from '../../types/offer';
import { useState } from 'react';
import { State } from '../../types/state';

type HotelProps = {
  offers: Offer[],
  reviews: ReviewType[],
  nearPlaces: Location[],
}

function Hotel({offers, reviews, nearPlaces}: HotelProps): JSX.Element {
  const params = useParams();
  const {id} = params;
  const zoom = 13;
  const city = useAppSelector((state) => state.city);

  const currentOffer = offers.find((item) => item.id === Number(id));

  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(undefined);

  const OfferPlaceHover = (hoveredOffer: number | null) => {
    const selectedOffer = useAppSelector((state) => state.offers.find((offer) => offer.id === hoveredOffer));
    if (hoveredOffer === null) {
      setSelectedLocation(undefined);
    } else {
      selectedOffer?.location;
    }
  };

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {currentOffer?.images.map((item, index) => (
                <div key={index} className="property__image-wrapper">
                  <img
                    className="property__image"
                    src={item}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              <div className="property__mark">
                <span>Premium</span>
              </div>
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {currentOffer?.title}
                </h1>
                <button
                  className="property__bookmark-button button"
                  type="button"
                >
                  <svg
                    className="property__bookmark-icon"
                    width="31"
                    height="33"
                  >
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: '80%' }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">
                {currentOffer?.rating}
                </span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {currentOffer?.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                {currentOffer?.bedrooms}
                </li>
                <li className="property__feature property__feature--adults">
                  Max {currentOffer?.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{currentOffer?.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                {currentOffer?.goods.map((item, index) => (<li key={index} className="property__inside-item">{item}</li>))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src={currentOffer?.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{currentOffer?.host.name}</span>
                  {currentOffer?.host.isPro ? <span className="property__user-status">Pro</span> : ''}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {currentOffer?.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <ReviewList reviews={reviews} />
                <FormComment/>
              </section>
            </div>
          </div>
          <Map className="property__map map" zoom={zoom} center={city.location} points={nearPlaces} selectedLocation={selectedLocation} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <PlaceList offers={offers} OfferPlaceHover={OfferPlaceHover} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Hotel;
