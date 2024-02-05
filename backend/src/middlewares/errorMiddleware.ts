import { ErrorRequestHandler } from 'express';
import { ClientError } from '../utils/errors';

export const handleError: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ClientError) {
    return res.status(err.statusCode).send({
      error: err.message,
      success: false,
    });
  }

  res.status(500).send({
    error: 'ServerError',
    success: false,
  });
};
