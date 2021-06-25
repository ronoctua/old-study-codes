import { customAlphabet } from 'nanoid';
import request from 'supertest';

import { PrismaClient, User } from '@prisma/client';
import { app } from '@shared/infra/server/app';

interface IUserData {
  username: string;
  email: string;
  unencryptedPassword: string;
}

const prisma = new PrismaClient();
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 15);

let adminUser: User;
let testUser: IUserData;
let adminToken: string;
let userTestToken: string;

describe('Update User', () => {
  beforeAll(async () => {
    adminUser = await prisma.user.create({
      data: {
        username: `@${nanoid()}`,
        email: `${nanoid()}@email.com`,
        password:
          '$2a$08$joyiC4r4/5.NjI/agPc7JuoxKmV5cptGQ5CkzxRon4VbXPxAaV172',
        isAdmin: true,
      },
    });

    const adminSessionToken = await request(app)
      .post('/sessions/session/new')
      .send({
        usernameOrEmail: adminUser.username,
        unencryptedPassword: 'ABcde1234',
      });

    adminToken = adminSessionToken.body.refreshToken;
  });

  beforeEach(async () => {
    testUser = {
      username: `@${nanoid()}`,
      email: `${nanoid()}@email.com`,
      unencryptedPassword: 'ABcde1234',
    };

    await request(app)
      .post('/users/user/create')
      .send(testUser)
      .set({
        Authorization: `Bearer ${adminToken}`,
      });

    const userTestSessionToken = await request(app)
      .post('/sessions/session/new')
      .send({
        usernameOrEmail: testUser.username,
        unencryptedPassword: testUser.unencryptedPassword,
      });

    userTestToken = userTestSessionToken.body.refreshToken;
  });

  afterAll(async (done) => {
    await prisma.$disconnect();

    done();
  });

  it('should be able to update user admin status', async () => {
    const response = await request(app)
      .patch(`/users/user/admin/status/update/${testUser.username}`)
      .set({
        Authorization: `Bearer ${adminToken}`,
      });

    expect(response.status).toBe(200);
  });

  it('should not be able to update user admin status without admin privileges', async () => {
    const response = await request(app)
      .patch(`/users/user/admin/status/update/${testUser.username}`)
      .set({
        Authorization: `Bearer ${userTestToken}`,
      });

    expect(response.status).toBe(401);
  });
});
