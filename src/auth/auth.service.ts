/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async registerUser(registerDto: RegisterDto) {
    const userExisting = await this.userService.getUserByEmail(
      registerDto.email,
    );

    if (userExisting) {
      throw new ConflictException('Email already exist');
    }
    const user = await this.userService.store(registerDto);
    delete user.password;

    return user;
  }

  async loginUser(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const accessToken = this.getAccessToken(user);
    return { user, accessToken };
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const { password, ...result } = user;
    return result;
  }

  // helper
  getAccessToken(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }
}
