import {
  createUser as create,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  updateUserById,
} from '../utils/db';
import { ClientError, ErrorCodes, ErrorMessages } from '../utils/errors';
import { generateRandomPassword } from '../utils/password';

export interface UserProps {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}

export const createUser = async ({
  email,
  username,
  firstName,
  lastName,
}: UserProps) => {
  if (!email || !username || !firstName || !lastName) {
    throw new ClientError(
      ErrorMessages.VALIDATION_ERROR,
      ErrorCodes.BAD_REQUEST
    );
  }

  if (await getUserByEmail(email)) {
    throw new ClientError(ErrorMessages.EMAIL_IN_USE, ErrorCodes.CONFLICT);
  }

  if (await getUserByUsername(username)) {
    throw new ClientError(ErrorMessages.USERNAME_IN_USE, ErrorCodes.CONFLICT);
  }

  // Create a new user
  try {
    const newUser = await create({
      email,
      username,
      firstName,
      lastName,
      password: generateRandomPassword(),
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
}: UserProps & { userId: string }) => {
  const id = parseInt(userId);

  if (!id || !email || !username || !firstName || !lastName) {
    throw new ClientError(
      ErrorMessages.VALIDATION_ERROR,
      ErrorCodes.BAD_REQUEST
    );
  }

  const currentUser = await getUserById(id);

  if (!currentUser) {
    throw new ClientError(ErrorMessages.USER_NOT_FOUND, ErrorCodes.NOT_FOUND);
  }

  const userWithGivenEmail = await getUserByEmail(email);

  if (userWithGivenEmail && userWithGivenEmail.id !== id) {
    throw new ClientError(ErrorMessages.EMAIL_IN_USE, ErrorCodes.CONFLICT);
  }

  const userWithGivenUsername = await getUserByUsername(username);

  if (userWithGivenUsername && userWithGivenUsername.id !== id) {
    throw new ClientError(ErrorMessages.USERNAME_IN_USE, ErrorCodes.CONFLICT);
  }

  // Update the user
  try {
    const updatedUser = await updateUserById(id, {
      email,
      username,
      firstName,
      lastName,
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
    throw new ClientError(ErrorMessages.USER_NOT_FOUND, ErrorCodes.NOT_FOUND);
  }

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};
