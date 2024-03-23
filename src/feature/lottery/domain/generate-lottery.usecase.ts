import { LotteryEntity } from "@/entity";

/**
 * ランダムな抽選番号を生成するUseCase
 */
export abstract class GenerateLotteryUseCase {
  abstract execute(): LotteryEntity;
}

export class GenerateLotteryUseCaseImpl implements GenerateLotteryUseCase {
  execute(): LotteryEntity {
    // 0 ~ 99 の範囲で乱数を生成
    const lottery = new LotteryEntity();
    lottery.number = Math.floor(Math.random() * 100);
    return lottery;
  }
}
