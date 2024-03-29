import { useNavigate } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { AdminRoutePaths, BaseRoutePaths } from '@utils/enums';
import { useAlerts, useApi } from '@utils/hooks';

export const useBookActions = () => {
  const navigate = useNavigate();
  const alerts = useAlerts();
  const api = useApi();

  const getBookPageUrlWithoutId = (): string => {
    return `${BaseRoutePaths.BOOK}`;
  };

  const getBookPageUrl = (id: number): string => {
    return `${BaseRoutePaths.BOOK}/${id}`;
  }

  const getAdminBookPageUrlWithoutId = (): string => {
    return `${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOK}`;
  }

  const getAdminBookPageUrl = (id: number): string => {
    return `${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOK}/${id}`;
  }

  const navigateToBookPage = (id: number): void => {
    navigate(getBookPageUrl(id));
  }

  const navigateToAdminBookPage = (id: number): void => {
    navigate(getAdminBookPageUrl(id));
  }

  const navigateToAdminBooksPage = (): void => {
    navigate(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS}`);
  }

  const navigateToEditForm = (id: number): void => {
    navigate(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS_EDIT}/${id}`);
  }

  const navigateToReadingPage = (id: number) => {
    navigate(`${BaseRoutePaths.BOOK}/${id}${BaseRoutePaths.READ}`);
  }

  const deleteBook = (id: number, successFallback: () => void) => {
    api.deleteBook(id)
      .then(successFallback)
      .catch(() => {
        alerts.addError(API_TOOLTIP_ERROR);
      });
  }

  return {
    getBookPageUrlWithoutId,
    getBookPageUrl,
    getAdminBookPageUrlWithoutId,
    getAdminBookPageUrl,
    navigateToBookPage,
    navigateToAdminBookPage,
    navigateToAdminBooksPage,
    navigateToEditForm,
    navigateToReadingPage,
    deleteBook
  }
}
