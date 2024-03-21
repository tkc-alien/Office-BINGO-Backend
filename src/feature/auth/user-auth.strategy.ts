import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-http-bearer";

import { UserEntity } from "@/entity/user.entity";
import { AuthService } from "@/feature/auth/auth.service";

@Injectable()
export class UserAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  /**
   * Bearerトークンを取得してユーザ認証を行う
   * @param bearerToken パッケージによってリクエストヘッダから取得されてこの関数に渡される
   * @returns 認証したユーザ（自動的にExecutionContextのuserパラメータに格納される）
   */
  async validate(bearerToken: string): Promise<UserEntity> {
    // BearerToken -> UID
    const uid = await this.authService.verify(bearerToken);
    // UID -> Userエンティティ
    // const user = await this.userService.findByUid(uid);
    // 返却
    // return user;

    // FIXME: UserServiceを作って修正する
    const user = new UserEntity();
    user.uid = uid;
    return user;
  }
}
