import * as Validation from 'class-validator';
export class CreateUserDto {
  @Validation.IsNotEmpty()
  email: string;

  @Validation.IsNotEmpty()
  @Validation.MinLength(6)
  @Validation.MaxLength(32)
  password: string;

  @Validation.IsOptional()
  username?: string;
}
