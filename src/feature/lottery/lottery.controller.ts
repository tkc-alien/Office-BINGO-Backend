import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { ApiArrayResponse } from "@/decorator/api-array-response.decorator";
import { ApiSingleResponse } from "@/decorator/api-single-response.decorator";
import { CurrentUser } from "@/decorator/current-user.decorator";
import { UserEntity } from "@/entity";
import { UserAuthGuard } from "@/feature/auth/user-auth.guard";
import { LotteryService } from "@/feature/lottery/lottery.service";
import { LotteryInfo } from "@/info/lottery.info";

@Controller("lottery")
@ApiTags("lotteries")
@ApiBearerAuth()
@UseGuards(UserAuthGuard)
export class LotteryController {
  constructor(private readonly lotteryService: LotteryService) {}

  @Post()
  @ApiOperation({ summary: "抽選番号作成API" })
  @ApiSingleResponse({ type: LotteryInfo, status: 201 })
  async generate(@CurrentUser() currentUser: UserEntity): Promise<LotteryInfo> {
    const lottery = await this.lotteryService.generate(currentUser);
    return new LotteryInfo(lottery);
  }

  @Get()
  @ApiOperation({ summary: "抽選番号一括取得API" })
  @ApiArrayResponse({ type: LotteryInfo })
  async findByUser(
    @CurrentUser() currentUser: UserEntity
  ): Promise<LotteryInfo[]> {
    const lotteries = await this.lotteryService.findByUser(currentUser);
    return lotteries.map((lottery) => new LotteryInfo(lottery));
  }
}
