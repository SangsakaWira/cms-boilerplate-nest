import * as Validation from 'class-validator';
export class FilterContentDto {
  @Validation.IsString()
  @Validation.IsOptional()
  title?: string;

  @Validation.IsString()
  @Validation.IsOptional()
  body?: string;

  @Validation.IsNumber()
  @Validation.IsOptional()
  @Validation.IsPositive()
  page?: number;

  @Validation.IsNumber()
  @Validation.IsOptional()
  @Validation.IsPositive()
  limit?: number;

  sort?: string;
}
