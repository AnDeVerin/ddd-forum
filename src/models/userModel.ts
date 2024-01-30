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
  // Validate the input
  if (!email || !username) {
    throw new ClientError('ValidationError', ErrorCodes.BAD_REQUEST);
  }

  // Check if the user with given email already exists
  const userWithGivenEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (userWithGivenEmail) {
    throw new ClientError('EmailAlreadyInUse', ErrorCodes.CONFLICT);
  }

  // Check if the user with given username already exists
  const userWithGivenUsername = await prisma.user.findUnique({
    where: { username },
  });

  if (userWithGivenUsername) {
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
