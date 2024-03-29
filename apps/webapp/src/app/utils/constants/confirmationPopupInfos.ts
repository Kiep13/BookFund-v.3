import { IConfirmationPopup } from '@utils/interfaces';

export const DELETE_BOOK_CONFIRMATION_POPUP: IConfirmationPopup = {
  title: 'Delete book',
  text: 'Are you sure that you want delete this book?',
  confirmationButtonLabel: 'Delete'
}

export const DELETE_AUTHOR_CONFIRMATION_POPUP: IConfirmationPopup = {
  title: 'Delete author',
  text: 'Are you sure that you want delete this author? All related books will be also deleted.',
  confirmationButtonLabel: 'Delete'
}

export const DELETE_GENRE_CONFIRMATION_POPUP: IConfirmationPopup = {
  title: 'Delete genre',
  text: 'Are you sure that you want delete this genre?',
  confirmationButtonLabel: 'Delete'
}

export const DELETE_COLLECTION_CONFIRMATION_POPUP: IConfirmationPopup = {
  title: 'Delete collection',
  text: 'Are you sure that you want delete this collection?',
  confirmationButtonLabel: 'Delete'
}

export const REMOVE_FROM_FAVORITES_CONFIRMATION_POPUP: IConfirmationPopup = {
  title: 'Remove from favorites',
  text: 'Are you sure that you want remove this book from favorites?',
  confirmationButtonLabel: 'Remove'
}

export const DELETE_ARTICLE_FOLDER_CONFIRMATION_POPUP: IConfirmationPopup = {
  title: 'Delete folder',
  text: 'Are you sure that you want delete this folder?',
  confirmationButtonLabel: 'Delete'
}

export const DELETE_ARTICLE_CONFIRMATION_POPUP: IConfirmationPopup = {
  title: 'Delete article',
  text: 'Are you sure that you want delete this article?',
  confirmationButtonLabel: 'Delete'
}
