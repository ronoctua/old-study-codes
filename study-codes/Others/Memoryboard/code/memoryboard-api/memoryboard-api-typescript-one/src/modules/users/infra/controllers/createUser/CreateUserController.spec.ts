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
let notAdminUser: User;
let testUser: IUserData;
let adminToken: string;
let notAdminToken: string;

describe('Create User', () => {
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

    notAdminUser = await prisma.user.create({
      data: {
        username: `@${nanoid()}`,
        email: `${nanoid()}@email.com`,
        password:
          '$2a$08$joyiC4r4/5.NjI/agPc7JuoxKmV5cptGQ5CkzxRon4VbXPxAaV172',
        isAdmin: false,
      },
    });

    const adminSessionToken = await request(app)
      .post('/sessions/session/new')
      .send({
        usernameOrEmail: adminUser.username,
        unencryptedPassword: 'ABcde1234',
      });

    const notAdminSessionToken = await request(app)
      .post('/sessions/session/new')
      .send({
        usernameOrEmail: notAdminUser.username,
        unencryptedPassword: 'ABcde1234',
      });

    adminToken = adminSessionToken.body.refreshToken;
    notAdminToken = notAdminSessionToken.body.refreshToken;
  });

  beforeEach(async () => {
    testUser = {
      username: `@${nanoid()}`,
      email: `${nanoid()}@email.com`,
      unencryptedPassword: 'ABcde1234',
    };
  });

  afterAll(async (done) => {
    await prisma.$disconnect();

    done();
  });

  it('should be able to create a new user', async () => {
    const response = await request(app)
      .post('/users/user/create')
      .send(testUser)
      .set({
        Authorization: `Bearer ${adminToken}`,
      });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new user without having admin privileges', async () => {
    const response = await request(app)
      .post('/users/user/create')
      .send(testUser)
      .set({
        Authorization: `Bearer ${notAdminToken}`,
      });

    expect(response.status).toBe(401);
  });

  it('should not be able to create a new user with an invalid session token', async () => {
    const response = await request(app)
      .post('/users/user/create')
      .send(testUser)
      .set({
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTk3MzQyMDEsImV4cCI6MTYxOTgyMDYwMSwic3ViIjoiNiJ9.xRxqo3t9FYNm8GhphHuzT-RFEziFbnaUkLSGFnFWTRA',
      });

    expect(response.status).toBe(401);
  });

  it('should not be able to create a new user with an existent username', async () => {
    await request(app)
      .post('/users/user/create')
      .send(testUser)
      .set({
        Authorization: `Bearer ${adminToken}`,
      });

    testUser.email = `${nanoid()}@email.com`;

    const responseTwo = await request(app)
      .post('/users/user/create')
      .send(testUser)
      .set({
        Authorization: `Bearer ${adminToken}`,
      });

    expect(responseTwo.status).toBe(400);
  });

  it('should not be able to create a new user with an existent email', async () => {
    await request(app)
      .post('/users/user/create')
      .send(testUser)
      .set({
        Authorization: `Bearer ${adminToken}`,
      });

    testUser.username = `@${nanoid()}`;

    const responseTwo = await request(app)
      .post('/users/user/create')
      .send(testUser)
      .set({
        Authorization: `Bearer ${adminToken}`,
      });

    expect(responseTwo.status).toBe(400);
  });
});
