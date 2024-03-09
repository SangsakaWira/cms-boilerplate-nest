import { ApiProperty } from '@nestjs/swagger';
import * as Validation from 'class-validator';

export class CreateCategorizationDto {
  @ApiProperty({ example: '' })
  @Validation.IsNotEmpty()
  @Validation.IsDefined()
  @Validation.IsNumber()
  content_id: number;

  @ApiProperty({ example: '' })
  @Validation.IsNotEmpty()
  @Validation.IsDefined()
  @Validation.IsNumber()
  category_id: number;
}
