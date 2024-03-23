import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { SpotEntity } from "@/entity";

@Injectable()
export class SpotService {
  constructor(
    @InjectRepository(SpotEntity)
    private readonly spotRepository: Repository<SpotEntity>
  ) {}

  private repository(manager?: EntityManager): Repository<SpotEntity> {
    return manager?.getRepository(SpotEntity) ?? this.spotRepository;
  }

  /**
   * スポット一括取得
   * @param manager
   * @returns
   */
  async findAll(manager?: EntityManager): Promise<SpotEntity[]> {
    return this.repository(manager).find();
  }

  /**
   * スポット取得
   * @param id
   * @param manager
   * @returns
   */
  async findOne(id: number, manager?: EntityManager): Promise<SpotEntity> {
    return this.repository(manager).findOneBy({ id });
  }
}
