import { Router } from 'express';
import { userRoutes } from './controllers/list';

const router = Router();

/**
 * @swagger
 * securityDefinitions:
 *   APIKeyHeader:
 *     type: apiKey
 *     in: header
 *     name: User Authorization
 */

router.use('/user', userRoutes);
export default router;
