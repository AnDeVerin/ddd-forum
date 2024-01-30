import { RequestHandler } from 'express';
import { createUser as create } from '../models/userModel';

const createUser: RequestHandler = async (req, res, next) => {
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

export { createUser };
