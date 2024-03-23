import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SheetSquareEntity } from "@/entity";
import {
  GenerateSheetSquaresUseCase,
  GenerateSheetSquaresUseCaseImpl,
} from "@/feature/sheet-square/domain/generate-sheet-squares.usecase";
import { SheetSquareService } from "@/feature/sheet-square/sheet-square.service";

@Module({
  imports: [TypeOrmModule.forFeature([SheetSquareEntity])],
  exports: [SheetSquareService],
  providers: [
    SheetSquareService,
    {
      provide: GenerateSheetSquaresUseCase,
      useClass: GenerateSheetSquaresUseCaseImpl,
    },
  ],
})
export class SheetSquareModule {}
