import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SpotEntity } from "@/entity";
import { SpotController } from "@/feature/spot/spot.controller";
import { SpotService } from "@/feature/spot/spot.service";

@Module({
  imports: [TypeOrmModule.forFeature([SpotEntity])],
  controllers: [SpotController],
  providers: [SpotService],
})
export class SpotModule {}
