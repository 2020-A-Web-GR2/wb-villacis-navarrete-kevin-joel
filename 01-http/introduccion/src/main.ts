import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; //importar desde TypeScript
const cookieParser = require('cookie-parser') //Importar desde JS

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*
  levantar el servidor npm run start:dev
  cualquier configuracion aqui antes de await app.listen
  */
  //await app.listen(3000);
  app.use(cookieParser('Me gusta ella'));
  await app.listen(3001);
}
bootstrap();
