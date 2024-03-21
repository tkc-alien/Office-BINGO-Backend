import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import {
  LotteryEntity,
  SheetEntity,
  SheetSquareEntity,
  UserEntity,
} from "@/entity";
import { AuthService } from "@/feature/auth/auth.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [LotteryEntity, SheetSquareEntity, SheetEntity, UserEntity],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
