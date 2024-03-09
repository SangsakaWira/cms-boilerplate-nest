import { ApiProperty } from '@nestjs/swagger';
import * as Validation from 'class-validator';

export class UpdateContentDto {
  @Validation.IsOptional()
  @Validation.IsNumber()
  user_id?: number;

  @ApiProperty({ example: '' })
  @Validation.IsOptional()
  @Validation.IsDefined()
  @Validation.IsString()
  title?: string;

  @ApiProperty({ example: '' })
  @Validation.IsOptional()
  @Validation.IsDefined()
  @Validation.IsString()
  body?: string;
}
