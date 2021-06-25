import { container } from 'tsyringe';

import './providers';

import { NotesRepository } from '@modules/notes/infra/prisma/repositories/NotesRepository';
import { INotesRepository } from '@modules/notes/repositories/INotesRepository';
import { UsersRepository } from '@modules/users/infra/prisma/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/users/infra/prisma/repositories/UsersTokensRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);

container.registerSingleton<INotesRepository>(
  'NotesRepository',
  NotesRepository,
);
