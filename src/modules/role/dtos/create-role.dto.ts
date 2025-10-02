import { IsObject, IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsObject()
  account?: Record<string, any>;

  @IsOptional()
  @IsObject()
  product?: Record<string, any>;

  @IsOptional()
  @IsObject()
  role?: Record<string, any>;
}
