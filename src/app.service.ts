import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private config: ConfigService) {}
  getHello(): string {
    return 'Hello World!';
  }
  create(data: any) {
    return { message: 'User created', data };
  }
  getEnvInfo() {
    return {
      env: this.config.get('ENV'),
      port: this.config.get<number>('PORT'),
    };
  }
}
