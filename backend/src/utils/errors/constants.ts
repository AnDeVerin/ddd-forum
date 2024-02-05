export enum ErrorCodes {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  CONFLICT = 409,
}

export enum ErrorMessages {
  VALIDATION_ERROR = 'ValidationError',
  USER_NOT_FOUND = 'UserNotFound',
  EMAIL_IN_USE = 'EmailAlreadyInUse',
  USERNAME_IN_USE = 'UsernameAlreadyTaken',
}
