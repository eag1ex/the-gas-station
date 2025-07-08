import { Body, Controller, Dependencies, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './user/user.dto';

@Controller()
@Dependencies(AppService)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello(); // returns a welcome message
  }

  @Get('envs')
  getEnvs() {
    // service for sensitive data is only available in dev env
    if (process.env.ENV !== 'development') return {};
    return this.appService.getEnvInfo(); // returns a welcome message
  }

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.appService.create(dto);
  }
}
