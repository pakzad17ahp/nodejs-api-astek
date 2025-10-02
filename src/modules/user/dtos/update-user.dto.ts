import {
  IsOptional,
  IsNumberString,
  MinLength,
  MaxLength,
  IsString,
  IsBoolean,
  IsUUID,
} from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumberString()
  @IsOptional()
  @MinLength(10)
  @MaxLength(10)
  phone?: string;

  @IsBoolean()
  @IsOptional()
  is_super_admin?: boolean;

  @IsUUID()
  @IsOptional()
  role?: string;
}
