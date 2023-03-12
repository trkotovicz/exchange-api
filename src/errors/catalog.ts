import { StatusCodes } from 'http-status-codes'

export enum ErrorTypes {
  GenericError = 'GenericError',
  BadRequest = 'BadRequest',
  EntityNotFound = 'EntityNotFound',
  ConflictError = 'ConflictError',
  InvalidFormatError = 'InvalidFormatError',
  ValidationError = 'ValidationError',
  UnauthorizedError = 'UnauthorizedError'
}

interface ErrorResponseObject {
  message: string
  httpStatus: number
}

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
}

export const errorCatalog: ErrorCatalog = {
  GenericError: {
    message: 'Something wrong happend',
    httpStatus: StatusCodes.INTERNAL_SERVER_ERROR
  },
  BadRequest: {
    message: 'Something wrong happend',
    httpStatus: StatusCodes.BAD_REQUEST
  },
  EntityNotFound: {
    message: 'Entity Not Found',
    httpStatus: StatusCodes.NOT_FOUND
  },
  ConflictError: {
    message: 'Entity already exists',
    httpStatus: StatusCodes.CONFLICT
  },
  InvalidFormatError: {
    message: 'Invalid Format',
    httpStatus: StatusCodes.BAD_REQUEST
  },
  ValidationError: {
    message: 'Validation Error',
    httpStatus: StatusCodes.BAD_REQUEST
  },
  UnauthorizedError: {
    message: 'Unauthorized Access',
    httpStatus: StatusCodes.UNAUTHORIZED
  },
}
