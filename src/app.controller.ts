import {
  Controller,
  Dependencies,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
@Dependencies(AppService)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getHello() {
    const d = this.appService.getHello(); // returns a welcome message
    return { message: d };
  }
}
