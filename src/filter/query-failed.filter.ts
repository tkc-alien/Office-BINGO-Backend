import { ArgumentsHost, BadRequestException, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { PostgresError } from "pg-error-enum";
import { QueryFailedError } from "typeorm";

/**
 * 変換可能なエラー形式
 */
type ConvertibleError = {
  code: string;
  detail: string;
};

@Catch(QueryFailedError)
export class QueryFailedFilter extends BaseExceptionFilter {
  /**
   * QueryFailedError発生時に例外をフィルタリングする
   * @param exception
   * @param host
   * @returns
   */
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    // エラーを処理可能な形に変換する
    const error = exception.driverError as unknown as ConvertibleError;

    // 返却する例外
    let converted: object;

    // エラーコードによって返却する例外を分岐させる
    switch (error.code) {
      // ユニーク制約エラー
      case PostgresError.UNIQUE_VIOLATION:
        converted = new BadRequestException(error.detail);
        break;
      // どれにも当てはまらない場合、受け取った例外をそのまま返す
      default:
        converted = exception;
        break;
    }

    return super.catch(converted, host);
  }
}
