import { ErrorRequestHandler } from 'express';

import { ClientError, ErrorCodes, ErrorMessages } from '../utils/errors';
import { ResponseDTO } from '../utils/ResponseDTO';

export const handleError: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ClientError) {
    return res
      .status(err.statusCode)
      .send(new ResponseDTO(undefined, err.message));
  }

  res
    .status(ErrorCodes.SERVER_ERROR)
    .send(new ResponseDTO(undefined, ErrorMessages.SERVER_ERROR));
};
