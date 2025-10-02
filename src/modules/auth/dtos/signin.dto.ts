import { IsNotEmpty } from "class-validator";

export class SigninDto {
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  password!: string;
}
