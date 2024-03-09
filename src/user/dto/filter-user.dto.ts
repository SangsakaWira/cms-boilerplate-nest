import * as Validation from 'class-validator';
export class FilterUserDto {
  @Validation.IsString()
  @Validation.IsOptional()
  username?: string;

  @Validation.IsString()
  @Validation.IsOptional()
  email: string;

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
