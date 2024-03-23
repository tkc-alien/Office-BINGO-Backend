import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { SheetSquareEntity } from "@/entity";
import { GenerateSheetSquaresUseCase } from "@/feature/sheet-square/domain/generate-sheet-squares.usecase";

@Injectable()
export class SheetSquareService {
  constructor(
    @InjectRepository(SheetSquareEntity)
    private readonly sheetSquareRepository: Repository<SheetSquareEntity>,
    private readonly generateSheetSquaresUseCase: GenerateSheetSquaresUseCase
  ) {}

  private repository(manager?: EntityManager): Repository<SheetSquareEntity> {
    return (
      manager?.getRepository(SheetSquareEntity) ?? this.sheetSquareRepository
    );
  }

  async generate(manager?: EntityManager): Promise<SheetSquareEntity[]> {
    const squares = this.generateSheetSquaresUseCase.execute();
    return this.repository(manager).save(squares);
  }
}
