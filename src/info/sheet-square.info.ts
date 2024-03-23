import { ApiProperty } from "@nestjs/swagger";

import { SheetSquareEntity } from "@/entity";
import { LotteryInfo } from "@/info/lottery.info";

export class SheetSquareInfo {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly xPos: number;

  @ApiProperty()
  readonly yPos: number;

  @ApiProperty()
  readonly number: number;

  @ApiProperty()
  readonly lottery: LotteryInfo;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  constructor(sheetSquare: SheetSquareEntity) {
    this.id = sheetSquare.id;
    this.xPos = sheetSquare.xPos;
    this.yPos = sheetSquare.yPos;
    this.number = sheetSquare.number;
    this.lottery = sheetSquare.lottery
      ? new LotteryInfo(sheetSquare.lottery)
      : null;
    this.createdAt = sheetSquare.createdAt;
    this.updatedAt = sheetSquare.updatedAt;
  }
}
