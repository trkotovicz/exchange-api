import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { userController } from './main';

const userRouter = Router();

userRouter.post('/login', userController.login);
userRouter.post('/user', userController.createUser);

userRouter.use(authMiddleware);

userRouter.get('/user/:id', userController.getUserById);

export default userRouter;

/**
 * @swagger
 *  tags:
 *    name: User
 *    description: Endpoints de usuário
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *       User:
 *         type: object
 *         required:
 *            - username
 *            - password
 *         properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *         example:
 *            username: bartsimpson
 *            password: secret_password
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *       Login:
 *         type: object
 *         required:
 *            - username
 *            - password
 *         properties:
 *            username:
 *              type: string
 *            password:
 *              type: string
 *         example:
 *            username: johnwick
 *            password: Daisy!123
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *       UserResponse:
 *         type: object
 *         properties:
 *            id:
 *              type: integer
 *            username:
 *              type: string
 *            password:
 *              type: string
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *       UserIdResponse:
 *         type: object
 *         properties:
 *            id:
 *              type: integer
 *            username:
 *              type: string
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *       LoginResponse:
 *         type: object
 *         properties:
 *            user:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                username:
 *                  type: string
 *            token:
 *              type: string
 */

/**
 * @swagger
 *   /login:
 *      post:
 *        tags: [User]
 *        description: Login do usuário
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Login'
 *        responses:
 *          200:
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  $ref: '#/components/schemas/LoginResponse'
 */

/**
 * @swagger
 *   /user:
 *      post:
 *        tags: [User]
 *        description: Cadastro de usuário
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/User'
 *        responses:
 *          201:
 *            description: CREATED
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  $ref: '#/components/schemas/UserResponse'
 */

/**
 * @swagger
 *   /user/{id}:
 *      get:
 *        tags: [User]
 *        description: Retorna os dados de um usuário
 *        parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            required: true
 *        security:
 *          - apiKey: []
 *        responses:
 *          200:
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  $ref: '#/components/schemas/UserIdResponse'
 */
