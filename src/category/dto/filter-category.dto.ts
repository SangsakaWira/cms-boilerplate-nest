import * as Validation from 'class-validator';
export class FilterCategoryDto {
  @Validation.IsString()
  @Validation.IsOptional()
  name?: string;

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
