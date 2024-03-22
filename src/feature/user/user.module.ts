import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserEntity } from "@/entity";
import { UserController } from "@/feature/user/user.controller";
import { UserService } from "@/feature/user/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
