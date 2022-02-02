import { Route } from 'react-router-dom';
import * as React from 'react';

import { AdminRoutePaths } from '@core/enums';
import { wrapAdminPage } from '@features/page-wrapper';
import compose from '@shared/utils/compose';

import Authors from './authors';
import AuthorForm from './author-form';
import Books from './books';
import BookForm from './book-form';
import Genres from './genres';
import GenreForm from './genre-form';
import Dashboard from './dashboard';

export function App() {
  return (
    <>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.DASHBOARD}`} component={Dashboard}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR_NEW}`} component={AuthorForm}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHORS}`} component={Authors} exact/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS_NEW}`} component={BookForm}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS}`} component={Books} exact/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRES_NEW}`} component={GenreForm}/>
      <Route path={`${AdminRoutePaths.ADMIN}${AdminRoutePaths.GENRES}`} component={Genres} exact/>
    </>
  );
}

export default compose(
  wrapAdminPage()
)(App);