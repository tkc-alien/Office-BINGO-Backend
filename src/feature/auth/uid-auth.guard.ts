import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * Firebase認証(UIDのみ)のガードクラス
 */
@Injectable()
export class UidAuthGuard extends AuthGuard("bearer") {}
