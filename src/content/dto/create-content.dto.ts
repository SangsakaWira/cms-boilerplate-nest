import { ApiProperty } from '@nestjs/swagger';
import * as Validation from 'class-validator';

export class CreateContentDto {
  @ApiProperty({ example: '' })
  @Validation.IsOptional()
  @Validation.IsNumber()
  user_id?: number;

  @ApiProperty({ example: '' })
  @Validation.IsNotEmpty()
  @Validation.IsDefined()
  @Validation.IsString()
  title: string;

  @ApiProperty({ example: '' })
  @Validation.IsNotEmpty()
  @Validation.IsDefined()
  @Validation.IsString()
  body: string;
}
