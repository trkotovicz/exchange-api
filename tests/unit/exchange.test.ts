import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinonChai from "sinon-chai";
import Sinon from "sinon";
import Exchange from "../../src/models/Exchange";
import ExchangeService from "../../src/services/Exchange";
import { ErrorTypes } from "../../src/errors/catalog";
import { bodyExchangeSuccess, bodyExchangeFailure, mockFetchResponse } from "../mocks/exchangeMocks";

const { expect } = chai;

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Exchange unit tests', () => {
  describe('listExchanges', () => {

  });
  describe('createTransaction', () => {

  });
  describe('listAllTransactions', () => {

  });
});