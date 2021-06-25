import { Router } from 'express';

import { CreateSessionController } from '@modules/users/infra/controllers/createSession/CreateSessionController';
import { DeleteExpiredTokensController } from '@modules/users/infra/controllers/deleteExpiredTokens/DeleteExpiredTokensController';
import { LogoutController } from '@modules/users/infra/controllers/logout/LogoutController';
import { RefreshTokenController } from '@modules/users/infra/controllers/refreshToken/RefreshTokenController';
import { ensureAuthenticated } from '@shared/infra/server/middlewares/ensureAuthenticated';

const sessionsRouter = Router();

const createSessionController = new CreateSessionController();
const refreshTokenController = new RefreshTokenController();
const logoutController = new LogoutController();
const deleteExpiredTokensController = new DeleteExpiredTokensController();

sessionsRouter.post('/session/new', createSessionController.handle);

sessionsRouter.post(
  '/session/refresh/token',
  ensureAuthenticated,
  refreshTokenController.handle,
);

sessionsRouter.delete(
  '/session/logout',
  ensureAuthenticated,
  logoutController.handle,
);

sessionsRouter.delete(
  '/delete-expired-tokens',
  ensureAuthenticated,
  deleteExpiredTokensController.handle,
);

export { sessionsRouter };
