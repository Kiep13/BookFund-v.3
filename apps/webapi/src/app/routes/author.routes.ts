import { Router } from 'express';

import { ApiRoutesModifiers } from '@core/enums';
import authorController from '@controllers/author.controller';

const router = new Router();

router.post(`/${ApiRoutesModifiers.NEW}`, authorController.createAuthor);

export default router;