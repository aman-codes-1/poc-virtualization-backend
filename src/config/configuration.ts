import { config } from 'dotenv';
import * as Joi from 'joi';
import Iconfig from './IConfig';

config();

export const SWAGGER_URL = '/api-docs';

export const ABOUT = {
  description: 'Swagger Implementation',
  title: 'Render Large Data',
};

const envVarSchema = Joi.object({
  NODE_ENV: Joi.string().default('development'),
  PORT: Joi.number().default(4000),
  MONGO_URL: Joi.string().default('mongodb://localhost:27017/'),
  SEED: Joi.boolean().default(false),
}).unknown().required();

const { value: envVars } = envVarSchema.validate(process.env);

const myConfig: Iconfig = Object.freeze({
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoURI: envVars.MONGO_URL,
  seed: envVars.SEED,
  swaggerDefinition: {
    openapi: '3.0.0',
    servers: [{ url: 'http://localhost:9001/api/' }],
    info: {
      ...ABOUT,
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
  },
  swaggerUrl: SWAGGER_URL,

});

export default myConfig;
