import sqlite3 from 'sqlite3';
import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { errorCatalog, ErrorTypes } from '../errors/catalog';

const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req,
  res,
  _next
) => {
  // verifica se o erro é uma instância do sqlite
  // if (err instanceof sqlite3.DatabaseError) {
  //   return res.status(StatusCodes.BAD_REQUEST).json(err.message);
  // }

  if (err.message) {
    return res.status(StatusCodes.BAD_REQUEST).json(err.message)
  }
  // aqui vamos fazer o cast da mensagem de erro para uma chave do Enum ErrorTypes
  // com o keyof typeof - traduzindo seria algo como 'chaves do tipo de'
  // dizemos que o `err.message` é alguma das chaves do ErrorTypes
  const messageAsErrorType = err.message as keyof typeof ErrorTypes

  // vamos usar a mensagem para acessar um erro do nosso catálogo
  // se a mensagem não for uma chave do nosso catálogo "mappedError" vai retornar undefined e não entrar no "if"
  const mappedError = errorCatalog[messageAsErrorType]
  if (mappedError) {
    // dado que o erro está mapeado no nosso catálogo
    // "mappedError" tem valores necessário para responder a requisição
    const { httpStatus, message } = mappedError
    return res.status(httpStatus).json({ error: message })
  }

  // caso seja um erro não mapeado, o mostraremos no log de erros e retornaremos o status 500
  console.error(err)
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'internal error' })
}

export default errorHandler;
