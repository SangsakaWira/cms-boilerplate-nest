import * as Validation from 'class-validator';
export class UpdateUserDto {
  @Validation.IsOptional()
  @Validation.IsString()
  email?: string;

  @Validation.IsOptional()
  @Validation.IsString()
  username?: string;

  @Validation.IsOptional()
  @Validation.IsString()
  password?: string;
}
