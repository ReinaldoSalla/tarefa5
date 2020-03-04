import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMsg(): string {
    return 'Application created with NestJS';
  }
}