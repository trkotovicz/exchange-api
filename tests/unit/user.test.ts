import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import md5 from 'md5';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { ErrorTypes } from '../../src/errors/catalog';
import User from '../../src/models/User';
import UserService from '../../src/services/User';

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('UserService', () => {

  describe('createUser', () => {
    describe('on success', () => {
      let stub: sinon.SinonStub;
  
      beforeEach(() => {
        const createdUser = new User({
          id: 1,
          username: 'johndoe',
          password: md5('password'),
        });
        stub = sinon.stub(User, 'create').resolves(createdUser);
      });
  
      afterEach(() => {
        stub.restore();
      });
  
      it('should return user data', async () => {
        const userService = new UserService();
        const data = await userService.createUser('johndoe', 'password');
        expect(data.dataValues).to.deep.eq({
          id: 1,
          username: 'johndoe',
          password: md5('password'),
        });
        expect(stub).to.have.been.calledOnceWithExactly({
          username: 'johndoe',
          password: md5('password'),
        });
      });
    });

    describe('on failure', () => {
      it('should throw a ConflictError if user already exists', async () => {
        const existingUser = new User({
          id: 1,
          username: 'johndoe',
          password: md5('password'),
        });
        sinon.stub(User, 'findOne').resolves(existingUser);
        const userService = new UserService();
        const promise = userService.createUser('johndoe', 'password');
        await expect(promise).to.eventually.be.rejectedWith(ErrorTypes.ConflictError);
      });
    });
  });
});
