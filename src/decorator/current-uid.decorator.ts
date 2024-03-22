import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * リクエストしているユーザUIDを取得するデコレータ
 */
export const CurrentUid = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as string;
  }
);
