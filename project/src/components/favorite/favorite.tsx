import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { MouseEvent } from 'react';

type FavoriteProps = {
  img: string;
  name: string;
  price: number;
  type: string;
  premium: boolean;
  active: boolean;
  rating: number;
  id: number;
  setActiveOffer: (evt: MouseEvent<HTMLElement>) => void;
}

function Favorite({img, name, price, type, premium, active, rating, id, setActiveOffer}: FavoriteProps): JSX.Element {
  return (
    <article className="favorites__card place-card" onMouseOver={setActiveOffer}>
      {premium ? <div className="place-card__mark"><span>Premium</span></div> : ''}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={'/'}><img className="place-card__image" src={img} width="150" height="110" alt="Place image" /></Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${ active ? 'place-card__bookmark-button--active' : '' }`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}/${id}`}>{name}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Favorite;
