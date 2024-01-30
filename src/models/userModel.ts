import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { ClientError, ErrorCodes } from '../utils/errors';

const prisma = new PrismaClient();

interface User {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}

const generateRandomPassword = () => {
  // Generate a random 8-character password
  return crypto.randomBytes(4).toString('hex');
};

const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

const getUserByUsername = async (username: string) => {
  return await prisma.user.findUnique({ where: { username } });
};

export const createUser = async ({
  email,
  username,
  firstName,
  lastName,
}: User) => {
  if (!email || !username || !firstName || !lastName) {
    throw new ClientError('ValidationError', ErrorCodes.BAD_REQUEST);
  }

  if (await getUserByEmail(email)) {
    throw new ClientError('EmailAlreadyInUse', ErrorCodes.CONFLICT);
  }

  if (await getUserByUsername(username)) {
    throw new ClientError('UsernameAlreadyTaken', ErrorCodes.CONFLICT);
  }

  // Create a new user
  const password = generateRandomPassword();

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        firstName,
        lastName,
        password,
      },
    });

    return newUser;
  } catch (error) {
    throw new Error();
  }
};

export const editUser = async ({
  userId,
  email,
  username,
  firstName,
  lastName,
}: User & { userId: string }) => {
  const id = parseInt(userId);

  if (!id || !email || !username || !firstName || !lastName) {
    throw new ClientError('ValidationError', ErrorCodes.BAD_REQUEST);
  }

  const currentUser = await prisma.user.findUnique({ where: { id } });

  if (!currentUser) {
    throw new ClientError('UserNotFound', ErrorCodes.NOT_FOUND);
  }

  const userWithGivenEmail = await getUserByEmail(email);

  if (userWithGivenEmail && userWithGivenEmail.id !== id) {
    throw new ClientError('EmailAlreadyInUse', ErrorCodes.CONFLICT);
  }

  const userWithGivenUsername = await getUserByUsername(username);

  if (userWithGivenUsername && userWithGivenUsername.id !== id) {
    throw new ClientError('UsernameAlreadyTaken', ErrorCodes.CONFLICT);
  }

  // Update the user
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        email,
        username,
        firstName,
        lastName,
      },
    });

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      username: updatedUser.username,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
    };
  } catch (error) {
    throw new Error();
  }
};

export const getByEmail = async (email: string) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new ClientError('UserNotFound', ErrorCodes.NOT_FOUND);
  }

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};
