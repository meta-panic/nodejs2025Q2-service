import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe, Inject, ParseUUIDPipe, Put, Res, HttpStatus, HttpCode } from '@nestjs/common';
import { UsersService } from './service/user.service';
import { USER_SERVICE } from './service/user.service.interface';
import { CreateUserDto } from './dto/create-user';
import { plainToInstance } from 'class-transformer';
import { ReturnUserDto } from './dto/return-user';
import { UpdatePasswordDto } from './dto/update-user';
import { Response } from 'express';


@Controller('user')
export class UsersController {

  constructor(
    @Inject(USER_SERVICE)
    private readonly usersService: UsersService
  ) { }

  @Post()
  create(@Body(ValidationPipe) dto: CreateUserDto) {
    const createdUser = this.usersService.create(dto);

    const responce = plainToInstance(ReturnUserDto, createdUser, {
      excludeExtraneousValues: true,
    });

    return responce;
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findOne(id)
  }

  @Put(':id')
  updatePassword(@Param('id', new ParseUUIDPipe()) id: string, @Body(ValidationPipe) dto: UpdatePasswordDto) {
    return this.usersService.updatePassword(id, dto);
  }


  @HttpCode(204)
  @Delete(':id')
  deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.delete(id);
  }
}