import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { ApiSingleResponse } from "@/decorator/api-single-response.decorator";
import { CurrentUid } from "@/decorator/current-uid.decorator";
import { CurrentUser } from "@/decorator/current-user.decorator";
import { UserEntity } from "@/entity";
import { UidAuthGuard } from "@/feature/auth/uid-auth.guard";
import { UserAuthGuard } from "@/feature/auth/user-auth.guard";
import { CreateUserDto } from "@/feature/user/dto/create-user.dto";
import { UpdateUserDto } from "@/feature/user/dto/update-user.dto";
import { UserService } from "@/feature/user/user.service";
import { UserInfo } from "@/info/user.info";

@Controller("users")
@ApiTags("users")
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: "ユーザ登録API" })
  @ApiSingleResponse({ type: UserInfo, status: 201 })
  @UseGuards(UidAuthGuard)
  async create(
    @CurrentUid() currentUid: string,
    @Body() createUserDto: CreateUserDto
  ): Promise<UserInfo> {
    const user = await this.userService.create(currentUid, createUserDto);
    return new UserInfo(user);
  }

  @Get()
  @ApiOperation({ summary: "認証中ユーザ取得API" })
  @ApiSingleResponse({ type: UserInfo })
  @UseGuards(UserAuthGuard)
  async findCurrent(@CurrentUser() currentUser: UserEntity): Promise<UserInfo> {
    return new UserInfo(currentUser);
  }

  @Patch()
  @ApiOperation({ summary: "認証中ユーザ更新API" })
  @ApiSingleResponse({ type: UserInfo })
  @UseGuards(UserAuthGuard)
  async updateCurrentUser(
    @CurrentUser() currentUser: UserEntity,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserInfo> {
    const user = await this.userService.update(currentUser.id, updateUserDto);
    return new UserInfo(user);
  }

  @Delete()
  @ApiOperation({ summary: "認証中ユーザ削除API" })
  @ApiNoContentResponse()
  @UseGuards(UserAuthGuard)
  async removeCurrentUser(@CurrentUser() currentUser: UserEntity) {
    return this.userService.remove(currentUser.id);
  }
}
