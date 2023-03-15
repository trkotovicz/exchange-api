import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinonChai from "sinon-chai";
import sinon from "sinon";
import Exchange from "../../src/models/Exchange";
import ExchangeService from "../../src/services/Exchange";
import { ErrorTypes } from "../../src/errors/catalog";
import { bodyExchangeSuccess, bodyExchangeFailure, mockFetchResponse } from "../mocks/exchangeMocks";

const { expect } = chai;

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Exchange unit tests', () => {

  describe('listExchanges', () => {

    it('should returns exchange data', async () => {
      const fetchApiStub = sinon.stub().resolves(mockFetchResponse);
      const exchageService = new ExchangeService(fetchApiStub);

      const exchanges = await exchageService.listExchanges();

      expect(exchanges).to.deep.equal(mockFetchResponse);
      sinon.assert.calledOnce(fetchApiStub);
    });
  });

  // describe('createTransaction', () => {

  // });

  // describe('listAllTransactions', () => {

  // });
});