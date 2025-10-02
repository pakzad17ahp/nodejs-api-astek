import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  product_type!: string;

  @IsString()
  @IsNotEmpty()
  color!: string;
}
