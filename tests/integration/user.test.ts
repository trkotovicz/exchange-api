import { expect } from 'chai';
import sinon from 'sinon';
import request from 'supertest';
import app from '../../src/app';
import User from '../../src/models/User';
import UserService from '../../src/services/User';
import { userMock } from '../mocks/userMocks';

describe('userService', () => {

  describe('createUser', () => {

    describe('on success', () => {
      let stub: sinon.SinonSpy<any, any>;
  
      beforeEach(() => {
        const createdUser = new User(userMock.reponseSuccess);
        return stub = sinon.stub(User, 'create').resolves(createdUser);
      });
  
      afterEach(() => stub.restore());
  
      it('should return user data', async () => {
        const { bodySuccess: { username, password } } = userMock;
        const userService = new UserService();
        const data = await userService.createUser(username, password);
        expect(data.dataValues).to.deep.eq(userMock.reponseSuccess);
        sinon.assert.calledOnce(stub);
      });
    });
  
    describe('on failure', () => {
      let stub: sinon.SinonSpy<any, any>;
  
      beforeEach(() => {
        stub = sinon.stub(User, 'create').rejects(new Error('Mocked error'));
      });

      afterEach(() => stub.restore());
  
      it('should return 409 ConflictError if user already exists', async () => {
        const createdUser = new User(userMock.reponseSuccess);
        const existingUserStub = sinon.stub(User, 'findOne').resolves(createdUser);
  
        const newUser = userMock.bodyConflictFailure;
        const response = await request(app).post('/user').send(newUser);
  
        expect(response.status).to.equal(409);
        expect(response.body).to.deep.equal({ error: 'Entity already exists' });
  
        existingUserStub.restore(); 
      });
    });
  })
})