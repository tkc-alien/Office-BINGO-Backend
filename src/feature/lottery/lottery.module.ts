import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LotteryEntity } from "@/entity";
import {
  GenerateLotteryUseCase,
  GenerateLotteryUseCaseImpl,
} from "@/feature/lottery/domain/generate-lottery.usecase";
import { LotteryController } from "@/feature/lottery/lottery.controller";
import { LotteryService } from "@/feature/lottery/lottery.service";

@Module({
  imports: [TypeOrmModule.forFeature([LotteryEntity])],
  controllers: [LotteryController],
  providers: [
    LotteryService,
    {
      provide: GenerateLotteryUseCase,
      useClass: GenerateLotteryUseCaseImpl,
    },
  ],
})
export class LotteryModule {}
