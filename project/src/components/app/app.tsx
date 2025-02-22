import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getOffers } from '../../store/action';
import {AppRoute, AuthorizationStatus} from '../../const';
import NotFound from '../../pages/404/notFound';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import Hotel from '../../pages/hotel/hotel';
import PrivateRoute from '../private-route/privateRoute';
import { Location } from '../../types/offer';
import { ReviewType } from '../../types/reviewType';

type AppProps = {
  reviews: ReviewType[],
  nearPlaces: Location[],
}

function App({reviews, nearPlaces}: AppProps): JSX.Element {
  const dispatch = useAppDispatch();
  dispatch(getOffers());
  const offers = useAppSelector((state) => state.offers);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={'/'}
          element={<Main />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.NoAuth}
            >
              <Favorites offers={offers} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path={`${AppRoute.Room}/:id`}
          element={<Hotel offers={offers} reviews={reviews} nearPlaces={nearPlaces} />}
        />
        <Route
          path={'*'}
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
