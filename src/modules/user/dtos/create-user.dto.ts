import {
  IsNotEmpty,
  Length,
  IsNumberString,
  MaxLength,
  MinLength,
  IsUUID,
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  name!: string;

  @IsNumberString()
  @MinLength(10)
  @MaxLength(10)
  phone!: string;

  @Length(6, 20)
  password!: string;

  @IsUUID()
  @IsNotEmpty()
  role!: string;
}
