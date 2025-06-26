import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
  Inject,
  ParseUUIDPipe,
  Put,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './service/user.service';
import { USER_SERVICE } from './service/user.service.interface';
import { CreateUserDto } from './dto/create-user';
import { plainToInstance } from 'class-transformer';
import { ReturnUserDto } from './dto/return-user';
import { UpdatePasswordDto } from './dto/update-user';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body(ValidationPipe) dto: CreateUserDto) {
    const createdUser = this.usersService.create(dto);

    const responce = plainToInstance(ReturnUserDto, createdUser, {
      excludeExtraneousValues: true,
    });

    return responce;
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'Return user by id.' })
  @ApiResponse({ status: 400, description: 'Bad request (invalid userId).' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user password by id' })
  @ApiResponse({
    status: 200,
    description: 'The user password has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden (oldPassword is wrong).',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(id, dto);
  }

  @HttpCode(204)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({
    status: 204,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Bad request (invalid userId).' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.delete(id);
  }
}
