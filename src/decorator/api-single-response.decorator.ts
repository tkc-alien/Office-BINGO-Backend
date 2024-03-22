import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, getSchemaPath } from "@nestjs/swagger";

type Options<T extends Type> = {
  type: T;
  status?: number;
};

/**
 * 共通レスポンスに合わせたSwaggerデコレータ
 * @param statusCode
 * @param model
 * @returns
 */
export const ApiSingleResponse = <T extends Type>(options: Options<T>) => {
  // デコレータ作成
  return applyDecorators(
    ApiExtraModels(Response, options.type),
    ApiResponse({
      status: options.status ?? 200,
      schema: {
        allOf: [
          { $ref: getSchemaPath(Response) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(options.type),
              },
            },
          },
        ],
      },
    })
  );
};
