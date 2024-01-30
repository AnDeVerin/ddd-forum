import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import crypto from 'crypto';
import { ClientError, ErrorCodes } from '../utils/errors';

const prisma = new PrismaClient();

interface User {
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
}

const generateRandomPassword = () => {
  // Generate a random 8-character password
  return crypto.randomBytes(4).toString('hex');
};

export const createUser = async ({
  email,
  username,
  firstName,
  lastName,
}: User) => {
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
    if (error instanceof PrismaClientKnownRequestError) {
      if (
        error.code === 'P2002' &&
        Array.isArray(error.meta?.target) &&
        error.meta?.target.includes('email')
      ) {
        throw new ClientError('EmailAlreadyInUse', ErrorCodes.CONFLICT);
      }
    }

    throw new Error();
  }
};
