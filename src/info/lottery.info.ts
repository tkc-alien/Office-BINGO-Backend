import { ApiProperty } from "@nestjs/swagger";

import { LotteryEntity } from "@/entity";
import { UserInfo } from "@/info/user.info";

export class LotteryInfo {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly user: UserInfo;

  @ApiProperty()
  readonly number: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  constructor(lottery: LotteryEntity) {
    this.id = lottery.id;
    this.user = new UserInfo(lottery.user);
    this.number = lottery.number;
    this.createdAt = lottery.createdAt;
    this.updatedAt = lottery.updatedAt;
  }
}
