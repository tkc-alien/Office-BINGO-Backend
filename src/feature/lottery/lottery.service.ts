import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { LotteryEntity, UserEntity } from "@/entity";
import { GenerateLotteryUseCase } from "@/feature/lottery/domain/generate-lottery.usecase";

@Injectable()
export class LotteryService {
  constructor(
    @InjectRepository(LotteryEntity)
    private readonly lotteryRepository: Repository<LotteryEntity>,
    private readonly generateLotteryUseCase: GenerateLotteryUseCase
  ) {}

  private repository(manager?: EntityManager): Repository<LotteryEntity> {
    return manager?.getRepository(LotteryEntity) ?? this.lotteryRepository;
  }

  /**
   * 抽選番号生成
   * @param user
   * @param manager
   * @returns
   */
  async generate(
    user: UserEntity,
    manager?: EntityManager
  ): Promise<LotteryEntity> {
    const lottery = this.generateLotteryUseCase.execute();
    lottery.user = user;
    return this.repository(manager).save(lottery);
  }

  /**
   * 抽選番号一括取得(ユーザIDから)
   * @param user
   * @param manager
   * @returns
   */
  async findByUser(
    user: UserEntity,
    manager?: EntityManager
  ): Promise<LotteryEntity[]> {
    return this.repository(manager).find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }
}
