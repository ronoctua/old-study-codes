import { customAlphabet } from 'nanoid';
import request from 'supertest';

import { PrismaClient, User } from '@prisma/client';
import { app } from '@shared/infra/server/app';

interface IUserData {
  username: string;
  email: string;
  unencryptedPassword: string;
}

interface IUserNewData {
  currentPassword: string;
  newPassword: string;
  newUsername: string;
  newEmail: string;
}

const prisma = new PrismaClient();
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 15);

let adminUser: User;
let testUser: IUserData;
let testUserNewData: IUserNewData;
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

    testUserNewData = {
      currentPassword: 'ABcde1234',
      newPassword: 'ABcde12344678',
      newUsername: `@${nanoid()}`,
      newEmail: `${nanoid()}@email.com`,
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

  it('should be able to user to update himself', async () => {
    const response = await request(app)
      .patch('/users/user/profile/update')
      .send(testUserNewData)
      .set({
        Authorization: `Bearer ${userTestToken}`,
      });

    expect(response.status).toBe(200);
  });

  it('should not be able to update the user with a wrong password', async () => {
    testUserNewData.currentPassword = 'WrongPassword12345';

    const response = await request(app)
      .patch('/users/user/profile/update')
      .send(testUserNewData)
      .set({
        Authorization: `Bearer ${userTestToken}`,
      });

    expect(response.status).toBe(401);
  });

  it('should not be able to update the user with an invalid session token', async () => {
    const response = await request(app)
      .patch('/users/user/profile/update')
      .send(testUserNewData)
      .set({
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTk3MzQyMDEsImV4cCI6MTYxOTgyMDYwMSwic3ViIjoiNiJ9.xRxqo3t9FYNm8GhphHuzT-RFEziFbnaUkLSGFnFWTRA',
      });

    expect(response.status).toBe(401);
  });

  it('should not be able to update the user setting an existent username', async () => {
    testUserNewData.newUsername = adminUser.username;

    const response = await request(app)
      .patch('/users/user/profile/update')
      .send(testUserNewData)
      .set({
        Authorization: `Bearer ${userTestToken}`,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to update the user setting an existent email', async () => {
    testUserNewData.newUsername = adminUser.email;

    const response = await request(app)
      .patch('/users/user/profile/update')
      .send(testUserNewData)
      .set({
        Authorization: `Bearer ${userTestToken}`,
      });

    expect(response.status).toBe(400);
  });
});
