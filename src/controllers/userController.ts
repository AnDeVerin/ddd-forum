import { RequestHandler } from 'express';
import {
  createUser as create,
  editUser as edit,
  getByEmail,
} from '../models/userModel';

export const createUser: RequestHandler = async (req, res, next) => {
  const { email, username, firstName, lastName } = req.body;

  try {
    const user = await create({ email, username, firstName, lastName });

    res.status(201).send({
      error: undefined,
      data: user,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const editUser: RequestHandler = async (req, res, next) => {
  const { email, username, firstName, lastName } = req.body;
  const { userId } = req.params;

  try {
    const user = await edit({ userId, email, username, firstName, lastName });

    res.status(200).send({
      error: undefined,
      data: user,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserByEmail: RequestHandler = async (req, res, next) => {
  const { email } = req.query;

  try {
    const user = await getByEmail(email as string);

    res.status(200).send({
      error: undefined,
      data: user,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
