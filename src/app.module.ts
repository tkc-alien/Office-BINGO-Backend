import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";

import {
  LotteryEntity,
  SheetEntity,
  SheetSquareEntity,
  SpotEntity,
  UserEntity,
} from "@/entity";
import { AuthModule } from "@/feature/auth/auth.module";
import { LotteryModule } from "@/feature/lottery/lottery.module";
import { SheetModule } from "@/feature/sheet/sheet.module";
import { SheetSquareModule } from "@/feature/sheet-square/sheet-square.module";
import { SpotModule } from "@/feature/spot/spot.module";
import { UserModule } from "@/feature/user/user.module";
import { QueryFailedFilter } from "@/filter/query-failed.filter";
import { ResponseInterceptor } from "@/interceptor/response.interceptor";

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
      entities: [
        LotteryEntity,
        SheetSquareEntity,
        SheetEntity,
        SpotEntity,
        UserEntity,
      ],
    }),
    AuthModule,
    LotteryModule,
    UserModule,
    SheetModule,
    SheetSquareModule,
    SpotModule,
  ],
  providers: [
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: APP_FILTER, useClass: QueryFailedFilter },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
})
export class AppModule {}
