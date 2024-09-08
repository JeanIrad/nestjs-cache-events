import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './dto/dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async createUser(@Body() body: UserDto) {
    return this.appService.createUser(body);
  }
}
