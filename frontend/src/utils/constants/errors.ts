export enum ErrorMessages {
  VALIDATION_ERROR = 'ValidationError',
  USER_NOT_FOUND = 'UserNotFound',
  EMAIL_IN_USE = 'EmailAlreadyInUse',
  USERNAME_IN_USE = 'UsernameAlreadyTaken',
}
// Copy from backend/src/utils/errors/constants.ts

export const ErrorTexts: Record<ErrorMessages, string> = {
  [ErrorMessages.VALIDATION_ERROR]: 'Validation error',
  [ErrorMessages.USER_NOT_FOUND]: 'User not found',
  [ErrorMessages.EMAIL_IN_USE]: 'Email already in use',
  [ErrorMessages.USERNAME_IN_USE]: 'Username already taken',
};
