import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { SheetEntity, SheetSquareEntity, UserEntity } from "@/entity";

@Injectable()
export class SheetService {
  constructor(
    @InjectRepository(SheetEntity)
    private readonly sheetRepository: Repository<SheetEntity>
  ) {}

  private repository(manager?: EntityManager): Repository<SheetEntity> {
    return manager?.getRepository(SheetEntity) ?? this.sheetRepository;
  }

  /**
   * シート作成
   * @param dto
   * @param manager
   * @returns
   */
  async create(
    user: UserEntity,
    squares: SheetSquareEntity[],
    manager?: EntityManager
  ): Promise<SheetEntity> {
    const sheet = new SheetEntity();
    sheet.user = user;
    sheet.squares = squares;
    return this.repository(manager).save(sheet);
  }

  /**
   * シート一括取得(ユーザIDから)
   * @param user
   * @param manager
   * @returns
   */
  async findByUser(
    user: UserEntity,
    manager?: EntityManager
  ): Promise<SheetEntity[]> {
    return this.repository(manager).find({
      relations: { squares: true },
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }

  /**
   * シート単一取得
   * @param id
   * @param manager
   * @returns
   */
  async findOne(
    id: number,
    manager?: EntityManager
  ): Promise<SheetEntity | null> {
    return this.repository(manager).findOneBy({ id });
  }
}
