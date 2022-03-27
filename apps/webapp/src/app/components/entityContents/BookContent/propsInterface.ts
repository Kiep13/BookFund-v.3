import { IBook } from '@utils/interfaces';

export interface IProps {
  book: IBook | undefined,
  authorLink: string,
  isCommentFormShown?: boolean,
  isStatusShown?: boolean,
  handleBookChange?: Function
}
