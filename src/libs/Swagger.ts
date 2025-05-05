import { Router } from 'express';
import swaggerJSDoc = require('swagger-jsdoc');
import * as swaggerUi from 'swagger-ui-express';

export interface ISwaggerDefinition {
    swaggerDefinition: {
        openapi: string;
        servers: [{
            url: string;
            description: string;
        }];
        info: {
            title: string;
            description: string;
            version: string;
        }
    };
}

export default class Swagger {
  public static getRouter({ swaggerDefinition }: ISwaggerDefinition) {
    const router = Router();
    router.route('/')
      .get((req, res) => {
        // options for swagger doc
        const options = {
          // path to api docs
          apis: ['dist/**/*.js'],
          // import swagger definition
          swaggerDefinition,
        };
        // initialize swagger jsdocs
        const swaggerSpec = swaggerJSDoc(options);
        res.send(swaggerSpec);
      });
    return router;
  }

  public static getUI(swaggerUrl: string) {
    const options = {
      swaggerUrl: `${swaggerUrl}.json`,
    };
    return {
      serve: swaggerUi.serve,
      setup: swaggerUi.setup(undefined, options),
    };
  }
}
