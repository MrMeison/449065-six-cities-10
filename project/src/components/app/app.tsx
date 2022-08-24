import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import {AppRoute, AuthorizationStatus} from '../../const';
import NotFound from '../../pages/404/notFound';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import Hotel from '../../pages/hotel/hotel';
import PrivateRoute from '../private-route/privateRoute';
import { Location } from '../../types/offer';
import { ReviewType } from '../../types/reviewType';
import LoadingSpinner from '../../components/spinner/spinner';

type AppProps = {
  reviews: ReviewType[],
  nearPlaces: Location[],
}

function App({reviews, nearPlaces}: AppProps): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const loaded = useAppSelector((state) => state.loaded);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={'/'}
          element={loaded ? <LoadingSpinner /> : <Main/>}
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
