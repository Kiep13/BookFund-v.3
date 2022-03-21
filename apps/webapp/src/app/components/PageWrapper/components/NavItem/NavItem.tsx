import { NavLink } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { IMenuItem } from '../../interfaces';
import { STYLES_NAV_LINK } from '../../constants';
import { IProps } from './propsInterface';

export const NavItem = ({menuItem}: IProps) => {
  const {icon: Icon, title, url}: IMenuItem = menuItem;

  const itemButton = <ListItemButton key={title}
                                     sx={STYLES_NAV_LINK.navItem}>
    <ListItemIcon>
      <Icon sx={STYLES_NAV_LINK.navIcon}/>
    </ListItemIcon>
    <ListItemText primary={title}/>
  </ListItemButton>;

  if(url) {
    return (
      <NavLink to={url}
               style={(isActive) => isActive ? STYLES_NAV_LINK.navLinkActive : STYLES_NAV_LINK.navLink}
               exact>
        {itemButton}
      </NavLink>
    )
  }

  return (
    itemButton
  )
}