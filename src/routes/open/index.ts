import express, { Router } from 'express';

import { messageRouter } from './message';
import { bookRouter } from './books';

const openRoutes: Router = express.Router();

openRoutes.use('/message', messageRouter);
<<<<<<< HEAD
openRoutes.use('/books', bookRouter);
=======
>>>>>>> origin

export { openRoutes };
