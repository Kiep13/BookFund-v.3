import { Router } from 'express';

import { ApiRoutes, ApiRoutesModifiers } from '@core/enums';
import { bookController } from '@controllers/book.controller';
import { fileController } from '@controllers/file.controller';
import { readController } from '@controllers/read.controller';
import { adminMiddleware, authMiddleware } from '@middlewares/index';

const router = new Router();

router.get(`/${ApiRoutesModifiers.LIST}`, bookController.getBooks);
router.post(`/${ApiRoutesModifiers.NEW}`,  authMiddleware, adminMiddleware, bookController.createBook);
router.put(`/${ApiRoutesModifiers.UPDATE}/:id`, authMiddleware, adminMiddleware, bookController.updateBook);
router.delete(`/${ApiRoutesModifiers.DELETE}/:id`,  authMiddleware, adminMiddleware, bookController.deleteBook);

router.post(`/${ApiRoutes.FILE}/${ApiRoutesModifiers.SAVE}`, authMiddleware, adminMiddleware, fileController.saveFile);
router.get(`/${ApiRoutes.FILE}/:name`, authMiddleware, fileController.saveFile);

router.get(`/:id/${ApiRoutes.READ}`, readController.getFile);
router.get(`/:id`, bookController.getBook);

export default router;
