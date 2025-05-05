import myConfig from './config/configuration';
import Server from './Server';

const myServer = new Server(myConfig);

myServer.bootstrap();
myServer.run();
