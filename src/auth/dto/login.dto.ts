import { ApiProperty } from '@nestjs/swagger';
import * as Validation from 'class-validator';
export class LoginDto {
  @Validation.IsOptional()
  @Validation.IsNotEmpty()
  username?: string;

  @ApiProperty()
  @Validation.IsNotEmpty()
  @Validation.IsDefined()
  email: string;

  @ApiProperty()
  @Validation.IsNotEmpty()
  @Validation.IsDefined()
  password: string;
}
