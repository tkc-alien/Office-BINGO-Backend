import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * Firebase認証のガードクラス
 */
@Injectable()
export class UserAuthGuard extends AuthGuard("bearer") {}
