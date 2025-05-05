import * as express from 'express';
import * as cors from 'cors';
import * as compression from 'compression';
import * as morgan from 'morgan';
import Database from './libs/Database';
import { noRoutesFound, errorHandler } from './libs';
import allRoutes from './router';
import Swagger from './libs/Swagger';
// import { SWAGGER_URL } from './config/configuration';

class Server {
  private app: express.Express;

  // eslint-disable-next-line no-unused-vars
  constructor(private config) {
    this.app = express();
  }

  setupRoutes() {
    // GET
    this.app.get('/health-check', (req, res) => {
      console.log('health-check route called');
      res.status(200).json({
        status: 200,
        message: 'I am Okay!',
      });
    });

    /* Middlewares */
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(morgan('combined'));
    this.app.use('/api', allRoutes);
    this.app.use([noRoutesFound, errorHandler]);
  }

  // Express inbuilt middleware for parsing html and sendig json
  initBodyParser() {
    this.app.use([express.urlencoded({ extended: false }), express.json()]);
  }

  bootstrap() {
    this.initBodyParser();
    this.initSwagger();
    this.setupRoutes();
    return this.app;
  }

  // START SERVER AND CONNECT WITH LOCAL DB
  public async run() {
    const { port, env, mongoURI } = this.config;
    try {
      await Database.open(mongoURI);
      this.app.listen(port, () => {
        console.log(`Server is listening to port ${port}.... in ${env} environment.`);
      });
    } catch (error) {
      console.log("Connection to the database couldn't be established");
    }
    return this;
  }

  // Initialise Swagger
  private initSwagger() {
    const { swaggerDefinition, swaggerUrl } = this.config;
    // const SwaggerSetup = new Swagger();

    // JSON ROUTES
    this.app.use(`${swaggerUrl}.json`, Swagger.getRouter({
      swaggerDefinition,
    }));
    // UI Route
    const { serve, setup } = Swagger.getUI(swaggerUrl);
    this.app.use(swaggerUrl, serve, setup);
  }
}

export default Server;
