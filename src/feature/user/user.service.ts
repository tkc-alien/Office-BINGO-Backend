import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { UserEntity } from "@/entity";
import { CreateUserDto } from "@/feature/user/dto/create-user.dto";
import { UpdateUserDto } from "@/feature/user/dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  private repository(manager?: EntityManager): Repository<UserEntity> {
    return manager?.getRepository(UserEntity) ?? this.userRepository;
  }

  /**
   * ユーザ登録
   * @param uid
   * @param dto
   * @param manager
   * @returns 作成されたユーザ
   */
  async create(
    uid: string,
    dto: CreateUserDto,
    manager?: EntityManager
  ): Promise<UserEntity> {
    return this.repository(manager).save({
      uid: uid,
      ...dto,
    });
  }

  /**
   * ユーザ単一取得
   * @param id
   * @param manager
   * @returns
   */
  async findOne(id: number, manager?: EntityManager): Promise<UserEntity> {
    return this.repository(manager).findOneBy({ id });
  }

  /**
   * ユーザ単一取得(UIDから)
   * @param uid
   * @param manager
   * @returns
   */
  async findOneByUid(
    uid: string,
    manager?: EntityManager
  ): Promise<UserEntity> {
    return this.repository(manager).findOneBy({ uid });
  }

  /**
   * ユーザ更新
   * @param id
   * @param dto
   * @param manager
   * @returns
   */
  async update(
    id: number,
    dto: UpdateUserDto,
    manager?: EntityManager
  ): Promise<UserEntity> {
    const repository = this.repository(manager);
    const current = await repository.findOneBy({ id });
    if (!current) throw new NotFoundException();
    return this.repository(manager).save({ id: id, ...current, ...dto });
  }

  /**
   * ユーザ削除
   * @param id
   * @param manager
   * @returns
   */
  async remove(id: number, manager?: EntityManager) {
    return this.repository(manager).softRemove([{ id: id }]);
  }
}
