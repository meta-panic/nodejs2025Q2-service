import { Controller, Inject, Post, Body, ValidationPipe, HttpCode, UnauthorizedException, UsePipes } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "./service/auth.service";
import { AUTH_SERVICE } from "./service/auth.service.interface";
import { SignupDto } from "./dto/in/signup";
import { RefreshDto } from "./dto/in/refresh";
import { Public } from "src/core/decorators/public";
import { plainToInstance } from "class-transformer";
import { ReturnTokensDto } from "./dto/out/return-tokens";
import { decode } from "jsonwebtoken";
import { UnauthorizedValidationPipe } from "./decorators/UnauthorizedValidationPipe";


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authService: AuthService,
  ) { }

  @Public()
  @Post('/signup')
  @ApiOperation({ summary: 'Signup' })
  @ApiResponse({
    status: 201,
    description: 'User is valid and unique.',
  })
  @ApiResponse({ status: 400, description: 'Data is not valid, user cannot be registered.' })
  async signup(@Body(ValidationPipe) dto: SignupDto) {
    const response = await this.authService.signup(dto);;
    return response;
  }


  @Public()
  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 201,
    description: 'User is valid and unique.',
  })
  @ApiResponse({ status: 400, description: 'Data is not valid, user cannot login.' })
  @ApiResponse({ status: 403, description: 'No user with such data found.' })
  login(@Body(ValidationPipe) dto: SignupDto) {
    return this.authService.login(dto);
  }


  @Public()
  @Post('/refresh')
  @HttpCode(200)
  @UsePipes(new UnauthorizedValidationPipe())
  @ApiOperation({ summary: 'Refresh' })
  @ApiResponse({
    status: 200,
    description: 'User is valid and unique.',
  })
  @ApiResponse({ status: 400, description: 'Data is not valid, user cannot login.' })
  @ApiResponse({ status: 403, description: 'No user with such data found.' })
  async refresh(@Body() dto: RefreshDto) {
    const tokens = await this.authService.refresh(dto.refreshToken);
    return plainToInstance(ReturnTokensDto, tokens, {
      excludeExtraneousValues: true,
    });
  }
}
