import { Box } from '@mui/material';

import { STYLES_PAGE_WRAPPER } from '../../constants';
import { Header, Sidenav } from '../index';
import { IProps } from './propsInterface';

export const PageWithSidebar = (props: IProps) =>
  <Box sx={STYLES_PAGE_WRAPPER.pageWithSidebar}>
    <Sidenav menuItems={props.menuItems}/>
    <Box component='main' sx={STYLES_PAGE_WRAPPER.box}>
      <Box sx={STYLES_PAGE_WRAPPER.header}>
        <Header/>
      </Box>
      {props.children}
    </Box>
  </Box>
