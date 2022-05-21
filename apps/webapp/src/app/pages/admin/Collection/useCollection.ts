import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { DELETE_CARD_ACTION, EDIT_CARD_ACTION } from '@utils/constants';
import { CardActions } from '@utils/enums';
import { useAlerts, useBookActions, useCollectionActions, useCollectionLoad } from '@utils/hooks';
import { ICardAction } from '@utils/interfaces';

import { SUCCESSFULLY_DELETED } from './constants';

export const useCollection = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const history = useHistory();

  const {collection, pageState, loadCollection} = useCollectionLoad();
  const {addSuccess} = useAlerts();
  const {getAdminBookPageUrlWithoutId} = useBookActions();
  const {navigateToEditForm, deleteCollection, navigateToAdminCollectionsPage} = useCollectionActions();

  const headerActions: ICardAction[] = [EDIT_CARD_ACTION, DELETE_CARD_ACTION];

  const navigateToEditPage = (): void => {
    collection && navigateToEditForm(collection.id);
  }

  const handleConfirmDeletion = (): void => {
    collection && deleteCollection(collection.id, () => {
      addSuccess(SUCCESSFULLY_DELETED);
      navigateToAdminCollectionsPage();
    });

    setIsModalOpened(false);
  }
  const navigateBack = (): void => {
    history.goBack();
  }

  const openModal = (): void => {
    setIsModalOpened(true);
  }

  const handleHeaderIconClick = (action: CardActions): void => {
    switch (action) {
      case CardActions.EDIT: navigateToEditPage(); break;
      case CardActions.DELETE: openModal(); break;
    }
  }

  const closeModal = (): void => {
    setIsModalOpened(false);
  }

  return {
    collection,
    pageState,
    headerActions,
    isModalOpened,
    loadCollection,
    navigateBack,
    handleHeaderIconClick,
    getAdminBookPageUrlWithoutId,
    handleConfirmDeletion,
    closeModal
  }
}
