import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';

import { User } from '.prisma/client';

import { IUpdateUserAdminStatusByUsernameDTO } from '../dtos/IUpdateUserAdminStatusByUsernameDTO';
import { IUpdateUserAvatarByIdDTO } from '../dtos/IUpdateUserAvatarByIdDTO';
import { IUpdateUserByIdDTO } from '../dtos/IUpdateUserByIdDTO';

interface IUserAndNotes extends User {
  notes: {
    noteId: number;
    permission: string;
  }[];
}

interface IUsersRepository {
  createUser(data: ICreateUserDTO): Promise<User>;
  findAllUsers(): Promise<User[] | null>;
  findUsersByNoteId(noteId: string | number): Promise<IUserAndNotes[] | null>;
  findUserById(userId: string | number): Promise<User | null>;
  findUserAndNotesById(userId: string | number): Promise<IUserAndNotes | null>;
  findUserByUsername(username: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserByUsernameOrEmail(usernameOrEmail: string): Promise<User | null>;
  updateUserById(data: IUpdateUserByIdDTO): Promise<User>;
  updateUserAvatarById(data: IUpdateUserAvatarByIdDTO): Promise<User>;
  updateUserAdminStatusByUsername(
    data: IUpdateUserAdminStatusByUsernameDTO,
  ): Promise<User>;
  deleteUser(userId: string | number): Promise<User | null>;
}

export { IUsersRepository };
