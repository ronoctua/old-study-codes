import { Router } from 'express';

import { notesRouter } from '@modules/notes/infra/http/routes/notes.routes';
import { sessionsRouter } from '@modules/users/infra/http/routes/session.routes';
import { usersRouter } from '@modules/users/infra/http/routes/user.routes';

const router = Router();

router.get('/configs', (request, response) =>
  response.status(200).json({
    filesPath: `${request.protocol}://${request.get('host')}/files/public`,
  }),
);

router.use('/sessions', sessionsRouter);
router.use('/users', usersRouter);
router.use('/notes', notesRouter);

export { router };
