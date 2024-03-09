import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import * as Validation from 'class-validator';

export class RegisterDto {
  @ApiPropertyOptional({ example: '' })
  @Validation.IsOptional()
  username?: string;

  @ApiProperty({ example: '' })
  @Validation.IsNotEmpty()
  @Validation.IsString()
  email: string;

  @ApiProperty({ example: '' })
  @Validation.IsNotEmpty()
  @Validation.MinLength(6)
  @Validation.MaxLength(32)
  password: string;
}
