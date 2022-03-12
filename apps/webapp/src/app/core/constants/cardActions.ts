import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';

import { CardActions } from '@core/enums';
import { ICardAction } from '@core/interfaces';

export const LIKE_CARD_ACTION: ICardAction = {
  ariLabel: 'Add to favorite',
  actionType: CardActions.LIKE,
  icon: FavoriteTwoToneIcon
};

export const SHARE_CARD_ACTION: ICardAction = {
  ariLabel: 'Share',
  actionType: CardActions.SHARE,
  icon: ShareTwoToneIcon
}

export const EDIT_CARD_ACTION: ICardAction = {
  ariLabel: 'Edit collection',
  actionType: CardActions.EDIT,
  icon: EditTwoToneIcon
};

export const DELETE_CARD_ACTION: ICardAction = {
  ariLabel: 'Delete collection',
  actionType: CardActions.DELETE,
  icon: DeleteTwoToneIcon
};