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

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.appService.create(dto);
  }
}
