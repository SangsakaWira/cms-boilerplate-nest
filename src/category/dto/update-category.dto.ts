import { ApiProperty } from '@nestjs/swagger';
import * as Validation from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ example: '' })
  @Validation.IsOptional()
  @Validation.IsDefined()
  @Validation.IsString()
  name?: string;
}
