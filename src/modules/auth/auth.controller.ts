import { Controller, Inject, Post, Body, ValidationPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "./service/auth.service";
import { AUTH_SERVICE } from "./service/auth.service.interface";
import { SignupDto } from "./dto/in/signup";
import { RefreshDto } from "./dto/in/refresh";
import { Public } from "src/core/decorators/public";


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
    const kek = await this.authService.signup(dto);;
    console.log(kek)
    return kek;
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
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 201,
    description: 'User is valid and unique.',
  })
  @ApiResponse({ status: 400, description: 'Data is not valid, user cannot login.' })
  @ApiResponse({ status: 403, description: 'No user with such data found.' })
  refresh(@Body(ValidationPipe) dto: RefreshDto) {
    return this.authService.refresh(dto.login);
  }
}
