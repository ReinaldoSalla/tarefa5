import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { port } from "./properties";
import { route } from "./properties";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  await app.listen(port);
  console.log(`Application is running on: http://${route}`);
}
bootstrap();