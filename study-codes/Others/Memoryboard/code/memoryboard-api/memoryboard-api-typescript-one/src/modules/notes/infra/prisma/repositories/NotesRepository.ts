import { ICreateNoteDTO } from '@modules/notes/dtos/ICreateNoteDTO';
import { IDeleteRelationUserNoteDTO } from '@modules/notes/dtos/IDeleteRelationUserNoteDTO';
import { IShareUserNoteDTO } from '@modules/notes/dtos/IShareUserNoteDTO';
import { IUpdateNoteByNoteIdDTO } from '@modules/notes/dtos/IUpdateNoteByNoteIdDTO';
import { IUpdateNotePermissionDTO } from '@modules/notes/dtos/IUpdateNotePermissionDTO';
import { INotesRepository } from '@modules/notes/repositories/INotesRepository';
import { PrismaClient, Note, User_Note } from '@prisma/client';

const prisma = new PrismaClient();

interface INoteAndUsers extends Note {
  users: User_Note[];
}

interface INoteAndPermission extends Note {
  permission: string;
}

type NoteWithoutContentAndPermission = Omit<INoteAndPermission, 'content'>;

class NotesRepository implements INotesRepository {
  async createNote({ userId, title, type }: ICreateNoteDTO): Promise<Note> {
    const newNote = await prisma.note.create({
      data: {
        title,
        type,
        users: {
          create: [{ userId: Number(userId) }],
        },
      },
    });

    return newNote;
  }

  async deleteNoteByNoteId(noteId: string | number): Promise<Note | null> {
    const deletedNote = await prisma.note.delete({
      where: {
        id: Number(noteId),
      },
    });

    return deletedNote;
  }

  async deleteRelationUserNote({
    noteId,
    userId,
  }: IDeleteRelationUserNoteDTO): Promise<User_Note | null> {
    const deletedRelationNoteUser = await prisma.user_Note.delete({
      where: {
        userId_noteId: {
          noteId: Number(noteId),
          userId: Number(userId),
        },
      },
    });

    return deletedRelationNoteUser;
  }

  async shareUserNote({
    noteId,
    userId,
    permission,
  }: IShareUserNoteDTO): Promise<User_Note | null> {
    const relationNoteUserCreated = await prisma.user_Note.create({
      data: {
        noteId: Number(noteId),
        userId: Number(userId),
        permission,
      },
    });

    return relationNoteUserCreated;
  }

  async updateNotePermission({
    noteId,
    userId,
    permission,
  }: IUpdateNotePermissionDTO): Promise<User_Note | null> {
    const relationNoteUserUpdated = await prisma.user_Note.update({
      where: {
        userId_noteId: {
          noteId: Number(noteId),
          userId: Number(userId),
        },
      },
      data: {
        permission,
      },
    });

    return relationNoteUserUpdated;
  }

  async updateNoteByNoteId({
    noteId,
    title,
    type,
    content,
  }: IUpdateNoteByNoteIdDTO): Promise<Note> {
    const updatedNote = await prisma.note.update({
      where: {
        id: Number(noteId),
      },
      data: {
        title,
        type,
        content,
      },
    });

    return updatedNote;
  }

  async findNoteByNoteId(
    noteId: string | number,
  ): Promise<INoteAndUsers | null> {
    const note = await prisma.note.findUnique({
      where: {
        id: Number(noteId),
      },
      include: {
        users: true,
      },
    });

    return note;
  }

  async findNoteByTitle(title: string): Promise<Note | null> {
    const note = await prisma.note.findFirst({
      where: {
        title,
      },
    });

    return note;
  }

  async findNotesByUserId(
    userId: string | number,
  ): Promise<INoteAndPermission[] | []> {
    let newNotesArray: INoteAndPermission[] | [] = [];

    const notesArray = await prisma.note.findMany({
      where: {
        users: {
          some: {
            userId: Number(userId),
          },
        },
      },
      include: {
        users: {
          where: {
            userId: Number(userId),
          },
          select: {
            permission: true,
          },
        },
      },
      orderBy: {
        title: 'desc',
      },
    });

    if (notesArray) {
      notesArray.forEach((note) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { users, ...noteData } = note;

        const newNoteData = {
          ...noteData,
          permission: note.users[0].permission,
        };

        newNotesArray = [newNoteData, ...newNotesArray];
      });
    }

    return newNotesArray;
  }

  async findNotesByUserIdNoContent(
    userId: string | number,
  ): Promise<NoteWithoutContentAndPermission[]> {
    let newNotesArrayWithoutContent: NoteWithoutContentAndPermission[] | [] =
      [];

    const notesArrayWithoutContent = await prisma.note.findMany({
      where: {
        users: {
          some: {
            userId: Number(userId),
          },
        },
      },
      select: {
        id: true,
        title: true,
        type: true,
        users: {
          where: {
            userId: Number(userId),
          },
          select: {
            permission: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        title: 'desc',
      },
    });

    if (notesArrayWithoutContent) {
      notesArrayWithoutContent.forEach((note) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { users, ...noteData } = note;

        const newNoteData = {
          ...noteData,
          permission: note.users[0].permission,
        };

        newNotesArrayWithoutContent = [
          newNoteData,
          ...newNotesArrayWithoutContent,
        ];
      });
    }

    return newNotesArrayWithoutContent;
  }
}

export { NotesRepository };
