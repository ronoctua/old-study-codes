import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUpdateUserAdminStatusByUsernameDTO } from '@modules/users/dtos/IUpdateUserAdminStatusByUsernameDTO';
import { IUpdateUserAvatarByIdDTO } from '@modules/users/dtos/IUpdateUserAvatarByIdDTO';
import { IUpdateUserByIdDTO } from '@modules/users/dtos/IUpdateUserByIdDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

interface IUserAndNotes extends User {
  notes: {
    noteId: number;
    permission: string;
  }[];
}

class UsersRepository implements IUsersRepository {
  async createUser({
    username,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    return user;
  }

  async findAllUsers(): Promise<User[] | null> {
    const users = await prisma.user.findMany();

    return users;
  }

  async findUsersByNoteId(
    noteId: string | number,
  ): Promise<IUserAndNotes[] | null> {
    const users = await prisma.user.findMany({
      include: {
        notes: {
          where: {
            noteId: Number(noteId),
          },
          select: {
            noteId: true,
            permission: true,
          },
        },
      },
    });

    return users;
  }

  async findUserById(userId: string | number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    return user;
  }

  async findUserAndNotesById(
    userId: string | number,
  ): Promise<IUserAndNotes | null> {
    const userAndNotesId = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      include: {
        notes: {
          select: {
            noteId: true,
            permission: true,
          },
        },
      },
    });

    return userAndNotesId;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findUserByUsernameOrEmail(
    usernameOrEmail: string,
  ): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: usernameOrEmail,
          },
          {
            email: usernameOrEmail,
          },
        ],
      },
    });

    return user;
  }

  async updateUserById({
    userId,
    newPassword,
    newUsername,
    newEmail,
    newTheme,
  }: IUpdateUserByIdDTO): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        username: newUsername,
        email: newEmail,
        password: newPassword,
        theme: newTheme,
      },
    });

    return user;
  }

  async updateUserAvatarById({
    userId,
    userAvatar,
  }: IUpdateUserAvatarByIdDTO): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        avatar: userAvatar,
      },
    });

    return user;
  }

  async updateUserAdminStatusByUsername({
    username,
    newAdminStatus,
  }: IUpdateUserAdminStatusByUsernameDTO): Promise<User> {
    const user = await prisma.user.update({
      where: {
        username,
      },
      data: {
        isAdmin: newAdminStatus,
      },
    });

    return user;
  }

  async deleteUser(userId: string | number): Promise<User> {
    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });

    return deletedUser;
  }
}

export { UsersRepository };
