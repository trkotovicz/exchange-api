import Joi from 'joi';
import { ValidationError } from 'sequelize';
import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { errorCatalog, ErrorTypes } from '../errors/catalog';

const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req,
  res,
  _next,
) => {
  // verifica se é uma instância do joi
  if (err instanceof Joi.ValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).json(err.message);
  }

  // sequelize errors
  if (err instanceof ValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).json(err.message);
  }

  const messageAsErrorType = err.message as keyof typeof ErrorTypes;

  const mappedError = errorCatalog[messageAsErrorType];
  if (mappedError) {
    const { httpStatus, message } = mappedError;
    return res.status(httpStatus).json({ error: message });
  }

  console.error(err);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'internal error' });
};

export default errorHandler;
