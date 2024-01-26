'use server';

import prisma from '@/prisma/client';
import bcrypt from 'bcryptjs';

export const signUp = async ({
  name,
  email,
  password,
} : {
  name: string,
  email: string, 
  password: string
}) => {
  const user = await prisma.user.findUnique({
      where: {
          email,
      },
  });

  if (user) {
      throw new Error('User with that email already exists.');
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  await prisma.user.create({
      data: {
          name,
          email,
          password: passwordHash,
      },
  });

  return "Successfully created new user!";
};