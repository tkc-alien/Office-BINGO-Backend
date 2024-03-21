import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { AuthService } from "@/feature/auth/auth.service";
import { UidAuthStrategy } from "@/feature/auth/uid-auth.strategy";
import { UserAuthStrategy } from "@/feature/auth/user-auth.strategy";

@Module({
  imports: [PassportModule],
  providers: [AuthService, UidAuthStrategy, UserAuthStrategy],
})
export class AuthModule {}
