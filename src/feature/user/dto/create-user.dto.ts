import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl, MaxLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ description: "表示名" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  readonly displayName: string;

  @ApiProperty({ description: "アバターURL" })
  @IsUrl()
  readonly avatarUrl: string;
}
