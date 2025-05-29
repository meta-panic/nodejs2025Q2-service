import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe, Inject } from '@nestjs/common';
import { UsersService } from './service/user.service';
import { USER_SERVICE } from './service/user.service.interface';


@Controller('users')
export class UsersController {

  constructor(
    @Inject(USER_SERVICE)
    private readonly usersService: UsersService) { }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.findOne(id)
  }
}