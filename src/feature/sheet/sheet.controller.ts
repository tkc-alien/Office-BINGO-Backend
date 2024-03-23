import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { DataSource } from "typeorm";

import { ApiArrayResponse } from "@/decorator/api-array-response.decorator";
import { ApiSingleResponse } from "@/decorator/api-single-response.decorator";
import { CurrentUser } from "@/decorator/current-user.decorator";
import { UserEntity } from "@/entity";
import { UserAuthGuard } from "@/feature/auth/user-auth.guard";
import { SheetService } from "@/feature/sheet/sheet.service";
import { SheetSquareService } from "@/feature/sheet-square/sheet-square.service";
import { SheetInfo } from "@/info/sheet.info";

@Controller("sheets")
@ApiTags("sheets")
@ApiBearerAuth()
@UseGuards(UserAuthGuard)
export class SheetController {
  constructor(
    private readonly dataSource: DataSource,
    private readonly sheetService: SheetService,
    private readonly sheetSquareService: SheetSquareService
  ) {}

  @Post()
  @ApiOperation({ summary: "シート作成API" })
  @ApiSingleResponse({ type: SheetInfo, status: 201 })
  async create(@CurrentUser() currentUser: UserEntity): Promise<SheetInfo> {
    // 単一のトランザクション内で処理する
    return this.dataSource.transaction(async (manager) => {
      // マス目をランダムに生成する
      const squares = await this.sheetSquareService.generate(manager);
      // シートを作成する
      const sheet = await this.sheetService.create(
        currentUser,
        squares,
        manager
      );
      // 返却
      return new SheetInfo(sheet);
    });
  }

  @Get()
  @ApiOperation({ summary: "シート一括取得API" })
  @ApiArrayResponse({ type: SheetInfo })
  async findByUser(
    @CurrentUser() currentUser: UserEntity
  ): Promise<SheetInfo[]> {
    const sheets = await this.sheetService.findByUser(currentUser);
    return sheets.map((sheet) => new SheetInfo(sheet));
  }
}
