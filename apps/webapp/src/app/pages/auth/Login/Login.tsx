import {
  CssBaseline,
  Paper,
  Box,
  Grid,
  Typography
} from '@mui/material';
import { Link } from 'react-router-dom';

import { Logo } from '@components/Logo';
import { BaseRoutePaths } from '@utils/enums';

import { Copyright, LoginButtons } from './components';
import { STYLES_LOGIN_PAGE } from './constants';

export const Login = () =>
  <Grid container component='main' sx={STYLES_LOGIN_PAGE.pageGrid}>
    <CssBaseline/>
    <Grid
      item
      xs={false}
      sm={4}
      md={7}
      sx={STYLES_LOGIN_PAGE.imageBlock}
    />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={STYLES_LOGIN_PAGE.signInForm}
      >
        <Box sx={STYLES_LOGIN_PAGE.logo}>
          <Link to={BaseRoutePaths.HOME}>
            <Logo/>
          </Link>
        </Box>

        <Typography component='h1' variant='h5' sx={STYLES_LOGIN_PAGE.signInLabel}>
          Sign in
        </Typography>

        <Box sx={STYLES_LOGIN_PAGE.buttons}>
          <LoginButtons/>

          <Copyright sx={STYLES_LOGIN_PAGE.copyright}/>
        </Box>
      </Box>
    </Grid>
  </Grid>
