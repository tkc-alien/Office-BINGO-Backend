import { ApiProperty } from "@nestjs/swagger";

import { SheetEntity } from "@/entity";
import { SheetSquareInfo } from "@/info/sheet-square.info";

export class SheetInfo {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly squares: SheetSquareInfo[];

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  constructor(sheet: SheetEntity) {
    this.id = sheet.id;
    this.squares = sheet.squares.map((square) => new SheetSquareInfo(square));
    this.createdAt = sheet.createdAt;
    this.updatedAt = sheet.updatedAt;
  }
}
