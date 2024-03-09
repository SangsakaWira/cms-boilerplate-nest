import { ApiProperty } from '@nestjs/swagger';
import * as Validation from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: '' })
  @Validation.IsNotEmpty()
  @Validation.IsDefined()
  @Validation.IsString()
  name: string;
}
