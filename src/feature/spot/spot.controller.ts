import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { ApiArrayResponse } from "@/decorator/api-array-response.decorator";
import { UserAuthGuard } from "@/feature/auth/user-auth.guard";
import { SpotService } from "@/feature/spot/spot.service";
import { SpotInfo } from "@/info/spot.info";

@Controller("spots")
@ApiTags("spots")
@ApiBearerAuth()
@UseGuards(UserAuthGuard)
export class SpotController {
  constructor(private readonly spotService: SpotService) {}

  @Get()
  @ApiOperation({ summary: "スポット一括取得API" })
  @ApiArrayResponse({ type: SpotInfo })
  async findAll(): Promise<SpotInfo[]> {
    const spots = await this.spotService.findAll();
    return spots.map((spot) => new SpotInfo(spot));
  }
}
