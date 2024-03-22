import { PartialType } from "@nestjs/swagger";

import { CreateUserDto } from "@/feature/user/dto/create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {}
