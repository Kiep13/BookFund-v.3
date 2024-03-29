import { useSelector } from 'react-redux';
import { useNavigate, useLocation  } from 'react-router-dom';

import { getLastRoute, getPreviousRoute } from '@store/reducers';

export const useBackNavigation = (defaultPreviousRoute: string) => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousRoute = useSelector(getPreviousRoute);
  const lastRoute = useSelector(getLastRoute);

  const navigateBack = (comparableRoute) => {
    if(comparableRoute) {
      navigate(comparableRoute, {
        replace: true
      });
      return;
    }

    navigate(defaultPreviousRoute);
  }

  const navigatePreviousPage = () => {
    navigateBack(previousRoute && location.pathname !== previousRoute ? -1 : null);
  }

  const navigateLastPage = () => {
    navigateBack(lastRoute);
  }

  return {
    navigatePreviousPage,
    navigateLastPage
  }
}
