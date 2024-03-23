import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { UserEntity } from "@/entity/user.entity";

@Entity("lotteries")
export class LotteryEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  readonly id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @Column({ name: "number" })
  number: number;

  @CreateDateColumn({ name: "created_at" })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  readonly updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  readonly deletedAt: Date;
}
