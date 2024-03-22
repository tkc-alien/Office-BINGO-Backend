import { ApiProperty } from "@nestjs/swagger";

import { UserEntity } from "@/entity";

export class UserInfo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  uid: string;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  avatarUrl: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.uid = user.uid;
    this.displayName = user.displayName;
    this.avatarUrl = user.avatarUrl;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
