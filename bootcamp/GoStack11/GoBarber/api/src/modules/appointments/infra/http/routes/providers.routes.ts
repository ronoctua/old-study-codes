import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilyController from '../controllers/ProviderMonthAvailabilyController';
import ProviderDayAvailabilyController from '../controllers/ProviderDayAvailabilyController';

const providersRouter = Router();

const providersController = new ProvidersController();
const providerMonthAvailabilyController = new ProviderMonthAvailabilyController();
const providerDayAvailabilyController = new ProviderDayAvailabilyController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabilyController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabilyController.index,
);

export default providersRouter;
