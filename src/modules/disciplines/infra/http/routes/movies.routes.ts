import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticanted';

import uploadConfig from '@config/upload';

import MoviesController from '../controllers/MoviesController';

const upload = multer(uploadConfig.multer);

const moviesRouter = Router();
const moviesController = new MoviesController();

moviesRouter.use(ensureAuthenticated);

moviesRouter.post('/', upload.single('file'), moviesController.create);

moviesRouter.put('/', upload.single('file'), moviesController.update);

moviesRouter.get('/:movie_id', moviesController.index);

export default moviesRouter;
