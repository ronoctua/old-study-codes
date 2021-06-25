import { hash } from 'bcryptjs';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function execute() {
  const adminUsername = '@admin';
  const adminEmail = 'admin@email.com';
  const adminPassword = 'ABcde1234';

  const checkIfAdminExists = await prisma.user.findFirst({
    where: {
      OR: [
        {
          username: adminUsername,
        },
        {
          email: adminEmail,
        },
      ],
    },
  });

  if (checkIfAdminExists) {
    console.log(`\n>>> ERROR: @admin user already exists!\n`);
    await prisma.$disconnect();
    return;
  }

  const encryptedAdminPassword = await hash(adminPassword, 8);

  const adminUser = await prisma.user.create({
    data: {
      username: adminUsername,
      email: adminEmail,
      password: encryptedAdminPassword,
      isAdmin: true,
    },
  });

  if (!adminUser) {
    console.log(`\n>>> ERROR: Could not create user @admin!\n`);
    await prisma.$disconnect();
    return;
  }

  await prisma.$disconnect();
  console.log('✔ Admin user created.');
}

execute();
