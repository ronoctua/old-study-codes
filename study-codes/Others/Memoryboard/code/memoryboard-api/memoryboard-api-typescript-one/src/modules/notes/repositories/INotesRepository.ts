import { Note, User_Note } from '.prisma/client';

import { ICreateNoteDTO } from '../dtos/ICreateNoteDTO';
import { IDeleteRelationUserNoteDTO } from '../dtos/IDeleteRelationUserNoteDTO';
import { IShareUserNoteDTO } from '../dtos/IShareUserNoteDTO';
import { IUpdateNotePermissionDTO } from '../dtos/IUpdateNotePermissionDTO';
import { IUpdateNoteByNoteIdDTO } from '../dtos/IUpdateNoteByNoteIdDTO';

interface INoteAndUsers extends Note {
  users: User_Note[];
}

interface INoteAndPermission extends Note {
  permission: string;
}

type NoteWithoutContentAndPermission = Omit<INoteAndPermission, 'content'>;

interface INotesRepository {
  createNote(data: ICreateNoteDTO): Promise<Note>;
  deleteNoteByNoteId(noteId: string | number): Promise<Note | null>;
  deleteRelationUserNote(
    data: IDeleteRelationUserNoteDTO,
  ): Promise<User_Note | null>;
  shareUserNote(data: IShareUserNoteDTO): Promise<User_Note | null>;
  updateNotePermission(
    data: IUpdateNotePermissionDTO,
  ): Promise<User_Note | null>;
  updateNoteByNoteId(data: IUpdateNoteByNoteIdDTO): Promise<Note>;
  findNoteByNoteId(noteId: string | number): Promise<INoteAndUsers | null>;
  findNoteByTitle(title: string): Promise<Note | null>;
  findNotesByUserId(
    userId: string | number,
  ): Promise<INoteAndPermission[] | []>;
  findNotesByUserIdNoContent(
    userId: string | number,
  ): Promise<NoteWithoutContentAndPermission[] | []>;
}

export { INotesRepository };
