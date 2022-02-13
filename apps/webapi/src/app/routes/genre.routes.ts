import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import { genreController } from '@controllers/genre.controller';

const router = new Router();

router.post(`/${ApiRoutesModifiers.NEW}`, genreController.createGenre);

export default router;
