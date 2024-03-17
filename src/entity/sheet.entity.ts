import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { SheetSquareEntity } from "@/entity/sheet-square.entity";
import { UserEntity } from "@/entity/user.entity";

@Entity("sheets")
export class SheetEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  readonly id: number;

  @ManyToOne(() => UserEntity, (user) => user.sheets)
  @JoinColumn({ name: "user_id" })
  readonly user: UserEntity;

  @OneToMany(() => SheetSquareEntity, (square) => square.sheet)
  readonly squares: SheetSquareEntity[];

  @CreateDateColumn({ name: "created_at" })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  readonly updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  readonly deletedAt: Date;
}
