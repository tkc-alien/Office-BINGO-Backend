import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SheetEntity } from "@/entity";
import { SheetController } from "@/feature/sheet/sheet.controller";
import { SheetService } from "@/feature/sheet/sheet.service";
import { SheetSquareModule } from "@/feature/sheet-square/sheet-square.module";

@Module({
  imports: [TypeOrmModule.forFeature([SheetEntity]), SheetSquareModule],
  controllers: [SheetController],
  providers: [SheetService],
})
export class SheetModule {}
