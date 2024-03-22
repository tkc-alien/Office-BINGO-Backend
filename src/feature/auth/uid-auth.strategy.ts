import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-http-bearer";

import { AuthService } from "@/feature/auth/auth.service";

@Injectable()
export class UidAuthStrategy extends PassportStrategy(Strategy, "uid") {
  constructor(private authService: AuthService) {
    super();
  }

  /**
   * Bearerトークンを取得してユーザ認証を行う
   * @param bearerToken パッケージによってリクエストヘッダから取得されてこの関数に渡される
   * @returns 認証したUID（自動的にExecutionContextのuserパラメータに格納される）
   */
  async validate(bearerToken: string): Promise<string> {
    // BearerToken -> UID
    return await this.authService.verify(bearerToken);
  }
}
