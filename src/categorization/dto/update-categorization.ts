import { ApiProperty } from '@nestjs/swagger';
import * as Validation from 'class-validator';

export class UpdateCategorizationDto {
  @ApiProperty({ example: '' })
  @Validation.IsOptional()
  @Validation.IsDefined()
  @Validation.IsNumber()
  content_id: number;

  @ApiProperty({ example: '' })
  @Validation.IsOptional()
  @Validation.IsDefined()
  @Validation.IsNumber()
  category_id: number;
}
