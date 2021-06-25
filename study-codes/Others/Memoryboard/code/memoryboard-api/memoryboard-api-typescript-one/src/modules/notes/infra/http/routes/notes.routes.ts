import { Router } from 'express';

import { CreateUserNoteController } from '@modules/notes/infra/controllers/createUserNote/CreateUserNoteController';
import { DeleteUserNoteController } from '@modules/notes/infra/controllers/deleteUserNote/DeleteUserNoteController';
import { GetUserNoteController } from '@modules/notes/infra/controllers/getUserNote/GetUserNoteController';
import { GetUserNotesController } from '@modules/notes/infra/controllers/getUserNotes/GetUserNotesController';
import { GetUserNotesWithoutPassingContentController } from '@modules/notes/infra/controllers/getUserNotesWithoutPassingContent/GetUserNotesWithoutPassingContentController';
import { ShareUserNoteController } from '@modules/notes/infra/controllers/shareUserNote/ShareUserNoteController';
import { UpdateUserNoteController } from '@modules/notes/infra/controllers/updateUserNote/UpdateUserNoteController';
import { UpdateUserNotePermissionToEditController } from '@modules/notes/infra/controllers/updateUserNotePermissionToEdit/UpdateUserNotePermissionToEditController';
import { ensureAuthenticated } from '@shared/infra/server/middlewares/ensureAuthenticated';

const notesRouter = Router();

const createUserNoteController = new CreateUserNoteController();
const getUserNoteController = new GetUserNoteController();
const getUserNotesController = new GetUserNotesController();
const getUserNotesWithoutPassingContentController =
  new GetUserNotesWithoutPassingContentController();
const updateUserNoteController = new UpdateUserNoteController();
const updateUserNotePermissionToEditController =
  new UpdateUserNotePermissionToEditController();
const shareUserNoteController = new ShareUserNoteController();
const deleteUserNoteController = new DeleteUserNoteController();

notesRouter.post(
  '/user/note/create',
  ensureAuthenticated,
  createUserNoteController.handle,
);

notesRouter.get('/user', ensureAuthenticated, getUserNotesController.handle);

notesRouter.get(
  '/user/no-content',
  ensureAuthenticated,
  getUserNotesWithoutPassingContentController.handle,
);

notesRouter.get(
  '/user/note/:noteId',
  ensureAuthenticated,
  getUserNoteController.handle,
);

notesRouter.patch(
  '/user/note/update/:noteId',
  ensureAuthenticated,
  updateUserNoteController.handle,
);

notesRouter.patch(
  '/user/note/update/permission/:targetUserUsername/:noteId/edit',
  ensureAuthenticated,
  updateUserNotePermissionToEditController.handle,
);

notesRouter.post(
  '/user/note/share/:usernameToShare/:noteId/:permission',
  ensureAuthenticated,
  shareUserNoteController.handle,
);

notesRouter.delete(
  '/user/note/delete/:noteId',
  ensureAuthenticated,
  deleteUserNoteController.handle,
);

export { notesRouter };
