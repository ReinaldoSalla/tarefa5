import { Module } from '@nestjs/common';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NegotiationsModule } from "./negotiations/negotiations.module";
import { dbUrl } from "./properties";
import { clientDir } from "./properties";

@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath: clientDir}),
  	NegotiationsModule,
    MongooseModule.forRoot(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}