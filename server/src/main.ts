import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from './app.module';
import { port } from "./properties";
import { route } from "./properties";
import { clientDir } from "./properties";
import { dbUrl } from "./properties";
import * as helmet from "helmet";
import * as csurf from "csurf";
import * as rateLimit from "express-rate-limit";

const env = process.env.NODE_ENV === "production" ? "production" : "development";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors();
  //app.use(csurf()); // if using cookies and autorization/authentication
  if (env === "production") {
    app.use(rateLimit({
      windowMs: 60 * 1000, // 1 minute
      max: 100, // limit each IP to 100 requests/minute
    }));
  }
  await app.listen(port);
  console.log(`Server running. URL: http://${route}`);
  console.log(`MongoDB connected. URL: ${dbUrl}`);
  console.log(`Serving static content: Directory: ${clientDir}`);
}
bootstrap();