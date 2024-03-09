import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { GetUser } from './decorator/get-user.decorator';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register User' })
  @Post('/register')
  async register(@Body() payload: RegisterDto) {
    await this.authService.registerUser(payload);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login User' })
  @Post('/login')
  async login(@Body() payload: LoginDto) {
    const loginData = await this.authService.loginUser(payload);
    return {
      data: {
        accessToken: loginData.accessToken,
        user: loginData.user,
      },
    };
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Check User' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  me(@GetUser() user: User) {
    return {
      data: {
        user: user,
      },
    };
  }
}
