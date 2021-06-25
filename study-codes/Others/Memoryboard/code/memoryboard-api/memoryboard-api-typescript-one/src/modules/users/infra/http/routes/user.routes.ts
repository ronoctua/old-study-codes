import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateUserController } from '@modules/users/infra/controllers/createUser/CreateUserController';
import { DeleteUserController } from '@modules/users/infra/controllers/deleteUser/DeleteUserController';
import { ListAllUsersController } from '@modules/users/infra/controllers/listAllUsers/ListAllUsersController';
import { ShowUserDataController } from '@modules/users/infra/controllers/showUserData/ShowUserDataController';
import { ShowUserProfileController } from '@modules/users/infra/controllers/showUserProfile/ShowUserProfileController';
import { ShowUserProfileByTokenController } from '@modules/users/infra/controllers/showUserProfileByToken/ShowUserProfileByTokenController';
import { UpdateUserController } from '@modules/users/infra/controllers/updateUser/UpdateUserController';
import { UpdateUserAdminStatusController } from '@modules/users/infra/controllers/updateUserAdminStatus/UpdateUserAdminStatusController';
import { UpdateUserAvatarController } from '@modules/users/infra/controllers/updateUserAvatar/UpdateUserAvatarController';
import { ensureAdminStatus } from '@shared/infra/server/middlewares/ensureAdminStatus';
import { ensureAuthenticated } from '@shared/infra/server/middlewares/ensureAuthenticated';

const usersRouter = Router();

const createUserController = new CreateUserController();
const listAllUsersController = new ListAllUsersController();
const showUserDataController = new ShowUserDataController();
const showUserProfileController = new ShowUserProfileController();
const showUserProfileByTokenController = new ShowUserProfileByTokenController();
const updateUserController = new UpdateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const updateUserAdminStatusController = new UpdateUserAdminStatusController();
const deleteUserController = new DeleteUserController();

const upload = multer(uploadConfig.multer);

usersRouter.post(
  '/user/create',
  ensureAuthenticated,
  ensureAdminStatus,
  createUserController.handle,
);

usersRouter.get('/profile', ensureAuthenticated, listAllUsersController.handle);

usersRouter.get('/user', ensureAuthenticated, showUserDataController.handle);

usersRouter.get(
  '/user/profile/token',
  ensureAuthenticated,
  showUserProfileByTokenController.handle,
);

usersRouter.get(
  '/user/profile/:usernameOrEmail',
  ensureAuthenticated,
  showUserProfileController.handle,
);

usersRouter.patch(
  '/user/profile/update',
  ensureAuthenticated,
  updateUserController.handle,
);

usersRouter.patch(
  '/user/avatar/update',
  ensureAuthenticated,
  upload.single('avatar'),
  updateUserAvatarController.handle,
);

usersRouter.patch(
  '/user/admin/status/update/:username',
  ensureAuthenticated,
  ensureAdminStatus,
  updateUserAdminStatusController.handle,
);

usersRouter.delete(
  '/user/delete',
  ensureAuthenticated,
  deleteUserController.handle,
);

export { usersRouter };
