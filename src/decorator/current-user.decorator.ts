import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { UserEntity } from "@/entity";

/**
 * リクエストしているユーザを取得するデコレータ
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserEntity;
  }
);
