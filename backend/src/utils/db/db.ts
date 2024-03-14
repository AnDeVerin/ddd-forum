import { PrismaClient } from '@prisma/client';

import { UserProps } from '../../models/userModel';

const prisma = new PrismaClient();

export const getUserById = (id: number) =>
  prisma.user.findUnique({ where: { id } });

export const getUserByEmail = (email: string) =>
  prisma.user.findUnique({ where: { email } });

export const getUserByUsername = (username: string) =>
  prisma.user.findUnique({ where: { username } });

export const createUser = (props: UserProps & { password: string }) => {
  const { email, username, firstName, lastName, password } = props;

  return prisma.user.create({
    data: {
      email,
      username,
      firstName,
      lastName,
      password,
    },
  });
};

export const updateUserById = (id: number, data: UserProps) =>
  prisma.user.update({
    where: { id },
    data,
  });

export const getRecentPosts = (limit: number) => {
  return prisma.post.findMany({
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      votes: true,
      comments: true,
      memberPostedBy: {
        include: {
          user: true,
        },
      },
    },
  });
};
