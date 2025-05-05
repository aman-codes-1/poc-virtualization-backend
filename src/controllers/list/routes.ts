import { Router } from 'express';
import myList from './Controller';
import { cachedEmails, cachedCounts } from '../../libs/routes';

const router = Router();

/**
 * @swagger
 * definitions:
 *   UserSchema:
 *     properties:
 *       _id:
 *         type: string
 *       id:
 *         type: string
 *       originalId:
 *         type: string
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       phone:
 *         type: string
 *         example: "(993) 597-2163 x214"
 *       city:
 *         type: string
 *         example: "Lake Leoport"
 *       geolocation:
 *         type: String
 *         example: "9.7042 136.5600"
 *       website:
 *         type: string
 *         example: "jamey.name"
 *       company:
 *         type: string
 *         example: "Friesen - Spinka"
 *       createdAt:
 *         type: string
 *       deletedAt:
 *         type: string
 *   Users:
 *     type: array
 *     items:
 *       $ref: '#/definitions/UserSchema'
 *   User:
 *     type: object
 *     $ref: '#/definitions/UserSchema'
 *   UserListResponse:
 *     properties:
 *       message:
 *         type: string
 *         example: success
 *       status:
 *         type: integer
 *         example: 200
 *       data:
 *         $ref: '#/definitions/User'
 */

/**
 * @swagger
 * /user/list:
 *   get:
 *     security:
 *       - APIKeyHeader: []
 *     tags:
 *       - User
 *     description: Get all users.
 *     parameters:
 *       - name: name, role, email, role, phone, city,geolocation, website, company
 *         in: body
 *         description: Register User
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "John Watson"
 *             role:
 *               type: string
 *               example: "trainee"
 *             email:
 *               type: string
 *               example: "john@gmail.com"
 *             phone:
 *               type: string
 *               example: "(993) 597-2163 x214"
 *             city:
 *               type: string
 *               example: "Lake Leoport"
 *             geolocation:
 *               type: String
 *               example: "9.7042 136.5600"
 *             website:
 *               type: string
 *               example: "jamey.name"
 *             company:
 *               type: string
 *               example: "Friesen - Spinka"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User registered successfully.
 *         schema:
 *           $ref: '#/definitions/UserListResponse'
 *       500:
 *         description: Internal Server Error
 */

router.get('/list', myList.getAll);
router.get('/emails', cachedEmails, myList.getEmailsOneGo);
router.get('/count', cachedCounts, myList.getActiveDocCount);
router.get('/:originalId', myList.getOne);

/**
 * @swagger
 * /user/list/:originalId:
 *  put:
 *      requestBody:
 *          description: Enter OriginalId of user to update.
 *          parameters:
 *            - name: originalId
 *              in: path
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - originalId
 *                          - name
 *                          - role
 *                          - email
 *                          - phone
 *                          - geolocation
 *                          - city
 *                          - website
 *                          - company
 *                          - role
 *                      properties:
 *                          originalId:
 *                              type: string
 *                              example: 614ac5c9ee0df9a6a1545bce
 *                          name:
 *                              type: string
 *                              example: ram
 *                          role:
 *                              type: string
 *                              example: Trainer
 *                          email:
 *                              type: string
 *                              example: hello@successive.tech
 *      responses:
 *          200:
 *              description: User Updated successfully!
 *          500:
 *              description: UnResolved Error
 */

router.put('/:originalId', myList.update);

/**
 * @swagger
 * /user/list/:originalId:
 *  delete:
 *      requestBody:
 *          description: Enter OriginalId of user to delete.
 *          parameters:
 *            - name: originalId
 *              in: path
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - originalId
 *                      properties:
 *                          originalId:
 *                              type: string
 *                              example: 614ac5c9ee0df9a6a1545bce
 *      responses:
 *          200:
 *              description: User Deleted successfully!
 *          500:
 *              description: UnResolved Error
 */

router.delete('/:originalId', myList.delete);

export default router;
